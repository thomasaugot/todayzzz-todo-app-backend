import express, { Request, Response } from "express";
import app from "../server.js";
import db from "../db/db";

app.use(express.json());

// these routes are for USERS table only

// Create a User (Sign Up)
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, collections, todo_items_done } = req.body;
    const newUser = await db.query(
      "INSERT INTO users (firstname, lastname, collections, todo_items_done) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, collections, todo_items_done]
    );

    res.status(201).json({
      status: "success",
      data: {
        user: newUser.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get User by ID
app.get("/api/users/:user_id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const currentUser = await db.query("SELECT * FROM users WHERE user_id = $1", [userId]);

    if (currentUser.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        currentUser: currentUser.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update User by ID
app.put("/api/users/:user_id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const { firstname, lastname, collections, todo_items_done } = req.body;
    const updatedUser = await db.query(
      "UPDATE users SET firstname = $1, lastname = $2, collections = $3, todo_items_done = $4 WHERE user_id = $5 RETURNING *",
      [firstname, lastname, collections, todo_items_done, userId]
    );

    if (updatedUser.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete User by ID
app.delete("/api/users/:user_id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const deletedUser = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [
      userId,
    ]);

    if (deletedUser.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

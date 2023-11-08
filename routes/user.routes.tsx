import express, { Request, Response } from "express";
import app from "../server";
import db from "../db/db";

app.use(express.json());

// these routes are for USERS table only

// GET my current logged in user
app.get("/api/users/:user_id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const currentUser = await db.query("SELECT * FROM users WHERE user_id = $1", [userId]);

    res.status(200).json({
      status: "success",
      results: currentUser.rows.length,
      data: {
        currentUser: currentUser.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

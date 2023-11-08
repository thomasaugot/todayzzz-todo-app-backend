import express, { Request, Response } from "express";
import app from "../server.js";
import db from "../db/db";

app.use(express.json());

// these routes are for COLLECTIONS table only

// Create a Collection
app.post("/api/collections", async (req: Request, res: Response) => {
  try {
    const { name, todo_items, user_id } = req.body;
    const newCollection = await db.query(
      "INSERT INTO collections (name, todo_items, user_id) VALUES ($1, $2, $3) RETURNING *",
      [name, todo_items, user_id]
    );

    res.status(201).json({
      status: "success",
      data: {
        collection: newCollection.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Collection by ID
app.get("/api/collections/:collection_id", async (req: Request, res: Response) => {
  try {
    const collectionId = req.params.collection_id;
    const currentCollection = await db.query("SELECT * FROM collections WHERE collection_id = $1", [
      collectionId,
    ]);

    if (currentCollection.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Collection not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        collection: currentCollection.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Collection by ID
app.put("/api/collections/:collection_id", async (req: Request, res: Response) => {
  try {
    const collectionId = req.params.collection_id;
    const { name, todo_items } = req.body;
    const updatedCollection = await db.query(
      "UPDATE collections SET name = $1, todo_items = $2 WHERE collection_id = $3 RETURNING *",
      [name, todo_items, collectionId]
    );

    if (updatedCollection.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Collection not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        collection: updatedCollection.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Collection by ID
app.delete("/api/collections/:collection_id", async (req: Request, res: Response) => {
  try {
    const collectionId = req.params.collection_id;
    const deletedCollection = await db.query(
      "DELETE FROM collections WHERE collection_id = $1 RETURNING *",
      [collectionId]
    );

    if (deletedCollection.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Collection not found",
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

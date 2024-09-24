import express from "express";
import pool from "../db.js";

const router = express.Router();

// Create a new Collection
router.post("/collections", async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO collections (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]); // Return the created collection
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all Collections
router.get("/collections", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM collections");
    res.status(200).json(result.rows); // Return the list of collections
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Collection by ID
router.put("/collections/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await pool.query(
      "UPDATE collections SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(result.rows[0]); // Return the updated collection
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Collection by ID
router.delete("/collections/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM collections WHERE id = $1", [id]);
    res.status(204).send(); // Send a No Content status
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

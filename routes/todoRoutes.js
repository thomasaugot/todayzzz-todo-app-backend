import express from "express";
import pool from "../db.js";

const router = express.Router();

// Create a new Todo
router.post("/todos", async (req, res) => {
  const { title, description, collection_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO todos (title, description, collection_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, collection_id]
    );
    res.status(201).json(result.rows[0]); // Return the created todo
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all Todos by collection_id
router.get("/todos", async (req, res) => {
  const { collection_id } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM todos WHERE collection_id = $1",
      [collection_id]
    );
    res.status(200).json(result.rows); // Return the list of todos
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Todo by ID
router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *",
      [title, description, completed, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(result.rows[0]); // Return the updated todo
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Todo by ID
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(204).send(); // Send a No Content status
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

import express, { Request, Response } from "express";
import app from "../server.js";
import db from "../db/db";

app.use(express.json());

// these routes are for TODO_ITEMS table only

// Create a Todo Item
app.post("/api/todo_items", async (req: Request, res: Response) => {
  try {
    const { content, user_id, collection_id, is_done } = req.body;
    const newTodoItem = await db.query(
      "INSERT INTO todo_items (content, user_id, collection_id, is_done) VALUES ($1, $2, $3, $4) RETURNING *",
      [content, user_id, collection_id, is_done]
    );

    res.status(201).json({
      status: "success",
      data: {
        todo_item: newTodoItem.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Todo Item by ID
app.get("/api/todo_items/:todo_item_id", async (req: Request, res: Response) => {
  try {
    const todoItemId = req.params.todo_item_id;
    const currentTodoItem = await db.query("SELECT * FROM todo_items WHERE todo_item_id = $1", [
      todoItemId,
    ]);

    if (currentTodoItem.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Todo item not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        todo_item: currentTodoItem.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Todo Item by ID
app.put("/api/todo_items/:todo_item_id", async (req: Request, res: Response) => {
  try {
    const todoItemId = req.params.todo_item_id;
    const { content, is_done } = req.body;
    const updatedTodoItem = await db.query(
      "UPDATE todo_items SET content = $1, is_done = $2 WHERE todo_item_id = $3 RETURNING *",
      [content, is_done, todoItemId]
    );

    if (updatedTodoItem.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Todo item not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        todo_item: updatedTodoItem.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Todo Item by ID
app.delete("/api/todo_items/:todo_item_id", async (req: Request, res: Response) => {
  try {
    const todoItemId = req.params.todo_item_id;
    const deletedTodoItem = await db.query(
      "DELETE FROM todo_items WHERE todo_item_id = $1 RETURNING *",
      [todoItemId]
    );

    if (deletedTodoItem.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Todo item not found",
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

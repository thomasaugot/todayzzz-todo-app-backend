import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db/index";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/////////////////////////////////////////// USER ROUTES ////////////////////////////////////////////////////////

// Create a User (Sign Up)
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, collections, todo_items } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (firstname, lastname, collections, todo_items) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, collections, todo_items]
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
    const currentUser = await pool.query("SELECT * FROM users WHERE user_id = $1", [userId]);

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
    const { firstname, lastname, collections, todo_items } = req.body;
    const updatedUser = await pool.query(
      "UPDATE users SET firstname = $1, lastname = $2, collections = $3, todo_items = $4 WHERE user_id = $5 RETURNING *",
      [firstname, lastname, collections, todo_items, userId]
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
    const deletedUser = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [
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

///////////////////////////// COLLECTIONS ROUTES ////////////////////////////////////////////////////

// Create a Collection
app.post("/api/collections", async (req: Request, res: Response) => {
  try {
    const { name, todo_items, user_id } = req.body;
    const newCollection = await pool.query(
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

// Get All Collections
app.get("/api/collections", async (req: Request, res: Response) => {
  try {
    // const allCollections = await pool.query('SELECT * FROM collections');

    res.status(200).json({
      status: "success",
      data: {
        collections: ["hello", "hey"],
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
    const currentCollection = await pool.query(
      "SELECT * FROM collections WHERE collection_id = $1",
      [collectionId]
    );

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
    const updatedCollection = await pool.query(
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
    const deletedCollection = await pool.query(
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

///////////////////////////////////// TODO_ITEMS ROUTES ////////////////////////////////////////////////////

// Create a Todo Item
app.post("/api/todo_items", async (req: Request, res: Response) => {
  try {
    const { content, user_id, collection_id, is_done } = req.body;
    const newTodoItem = await pool.query(
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
    const currentTodoItem = await pool.query("SELECT * FROM todo_items WHERE todo_item_id = $1", [
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
    const updatedTodoItem = await pool.query(
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
    const deletedTodoItem = await pool.query(
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

const Todo = require("../models/Todo");

const todoController = {
  createTodo: async (req, res) => {
    const { title, description, collection_id } = req.body;
    try {
      const newTodo = await Todo.create(title, description, collection_id);
      res.json(newTodo);
    } catch (err) {
      res.status(500).json({ error: "Failed to create todo" });
    }
  },

  getTodosByCollection: async (req, res) => {
    const { collection_id } = req.params;
    try {
      const todos = await Todo.findAllByCollection(collection_id);
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve todos" });
    }
  },

  updateTodo: async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
      const updatedTodo = await Todo.updateById(
        id,
        title,
        description,
        completed
      );
      res.json(updatedTodo);
    } catch (err) {
      res.status(500).json({ error: "Failed to update todo" });
    }
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;
    try {
      await Todo.deleteById(id);
      res.json({ message: "Todo deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete todo" });
    }
  },
};

module.exports = todoController;

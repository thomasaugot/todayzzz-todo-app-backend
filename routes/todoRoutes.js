const express = require("express");
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/todos", authMiddleware, todoController.createTodo);
router.get(
  "/todos/:collection_id",
  authMiddleware,
  todoController.getTodosByCollection
);
router.put("/todos/:id", authMiddleware, todoController.updateTodo);
router.delete("/todos/:id", authMiddleware, todoController.deleteTodo);

module.exports = router;

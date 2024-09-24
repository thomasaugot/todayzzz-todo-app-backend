const db = require("../db");

const Todo = {
  create: async (title, description, collection_id) => {
    const result = await db.query(
      "INSERT INTO todos (title, description, collection_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, collection_id]
    );
    return result.rows[0];
  },

  findAllByCollection: async (collection_id) => {
    const result = await db.query(
      "SELECT * FROM todos WHERE collection_id = $1",
      [collection_id]
    );
    return result.rows;
  },

  updateById: async (id, title, description, completed) => {
    const result = await db.query(
      "UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *",
      [title, description, completed, id]
    );
    return result.rows[0];
  },

  deleteById: async (id) => {
    await db.query("DELETE FROM todos WHERE id = $1", [id]);
  },
};

module.exports = Todo;

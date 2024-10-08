import pool from "../db.js";

const Collection = {
  create: async (title, user_id) => {
    const result = await pool.query(
      "INSERT INTO collections (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, user_id]
    );
    return result.rows[0];
  },

  findAllByUser: async (user_id) => {
    const result = await pool.query(
      "SELECT * FROM collections WHERE user_id = $1",
      [user_id]
    );
    return result.rows;
  },

  findById: async (id) => {
    const result = await pool.query("SELECT * FROM collections WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  deleteById: async (id) => {
    await pool.query("DELETE FROM collections WHERE id = $1", [id]);
  },
};

export default Collection;

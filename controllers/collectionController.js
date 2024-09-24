const Collection = require("../models/Collection");

const collectionController = {
  createCollection: async (req, res) => {
    const { title, user_id } = req.body;
    try {
      const newCollection = await Collection.create(title, user_id);
      res.json(newCollection);
    } catch (err) {
      res.status(500).json({ error: "Failed to create collection" });
    }
  },

  getCollectionsByUser: async (req, res) => {
    const { user_id } = req.params;
    try {
      const collections = await Collection.findAllByUser(user_id);
      res.json(collections);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve collections" });
    }
  },

  deleteCollection: async (req, res) => {
    const { id } = req.params;
    try {
      await Collection.deleteById(id);
      res.json({ message: "Collection deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete collection" });
    }
  },
};

module.exports = collectionController;

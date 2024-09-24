const express = require("express");
const collectionController = require("../controllers/collectionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/collections",
  authMiddleware,
  collectionController.createCollection
);
router.get(
  "/collections/:user_id",
  authMiddleware,
  collectionController.getCollectionsByUser
);
router.delete(
  "/collections/:id",
  authMiddleware,
  collectionController.deleteCollection
);

module.exports = router;

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import collectionsRoutes from "./routes/collectionRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);
app.use("/api", collectionsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

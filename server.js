import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import collectionsRoutes from "./routes/collectionRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://todayzzz-todos.netlify.app",
];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);
app.use("/api", collectionsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

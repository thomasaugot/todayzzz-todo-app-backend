const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);
app.use("/api", collectionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

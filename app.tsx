import "dotenv/config"; // Gets access to environment variables/settings
import "./db"; // Connects to the database

import express from "express";

import config from "./config";

const app = express();

config(app);

import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

import authRoutes from "./routes/auth.routes";
app.use("/auth", authRoutes);

import errorHandling from "./error-handling";
errorHandling(app);

export default app;

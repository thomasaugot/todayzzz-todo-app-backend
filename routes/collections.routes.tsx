import express, { Request, Response } from "express";
import app from "../server";
import db from "../db/db";

app.use(express.json());

// these routes are for COLLECTIONS table only

// GET all collections
app.get("/api/collections", async (req: Request, res: Response) => {});

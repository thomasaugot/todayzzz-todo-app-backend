import express, { Request, Response } from "express";
import app from "../server";
import db from "../db/db";

app.use(express.json());

// these routes are for TODO_ITEMS table only

// GET all items
app.get("/api/todo-items", async (req: Request, res: Response) => {});

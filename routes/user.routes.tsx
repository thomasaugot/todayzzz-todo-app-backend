import express, { Request, Response } from "express";
import app from "../server";
import db from "../db/db";

app.use(express.json());

// these routes are for USERS table only

// GET all users
app.get("/api/v1/users", async (req: Request, res: Response) => {});

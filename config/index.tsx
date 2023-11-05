import express, { Application, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

const configureMiddleware = (app: Application) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};

export default configureMiddleware;

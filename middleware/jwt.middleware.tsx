import { Request } from "express";
import jwt from "express-jwt";

const getTokenFromHeaders = (req: Request): string | null => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
};

// @ts-ignore
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET as string,
  algorithms: ["HS256"],
  getToken: getTokenFromHeaders,
});

export { isAuthenticated };

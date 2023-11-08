import dotenv from "dotenv";
dotenv.config();
export const PORT = parseInt(process.env.PORT || "5005", 10);
export const DATABASE_URL = process.env.DATABASE_URL;

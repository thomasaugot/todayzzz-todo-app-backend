import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT || "5006", 10);
export const DATABASE_URL: string | undefined = process.env.DATABASE_URL;

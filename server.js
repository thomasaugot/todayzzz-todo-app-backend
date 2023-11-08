import cors from "cors";
import { PORT } from "./config.js";
import express from "express";

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});

export default app;

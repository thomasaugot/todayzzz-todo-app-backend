// @ts-ignore
import app from "./app";

const PORT: number | string = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

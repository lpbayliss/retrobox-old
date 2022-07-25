import express, { Request, Response } from "express";
import { boxRouter } from "./routes";

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Server!");
});

app.use(boxRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

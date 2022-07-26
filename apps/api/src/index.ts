import express, { Request, Response } from "express";
import { boxRouter, dropRouter, itemRouter } from "./routes";

const app = express();
const port = process.env.PORT || 4000;

app.get("/health", (_req: Request, res: Response) => {
  res.send("Healthy!");
});

app.use(boxRouter);
app.use(itemRouter);
app.use(dropRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

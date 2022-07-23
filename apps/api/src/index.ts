import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Server!");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

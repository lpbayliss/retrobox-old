import http from "http";
import app from "./app";

const server = http.createServer(app);
server.listen(() => {
  console.log(`⚡️[server]: Server is running`);
});

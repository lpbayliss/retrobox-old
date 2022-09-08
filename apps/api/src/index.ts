import createApp from "./app";

const app = createApp();

app.listen(app.get("port"), () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${app.get("port")}`
  );
});

import createApp from "./app";
import { configService } from "./services";

const app = createApp(configService);

app.listen(app.get("port"), () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${app.get("port")}`
  );
});

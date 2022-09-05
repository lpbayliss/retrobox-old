import createApp from "./app";
import { configService } from "./services";
import { fetchOrCreateUserByEmailUseCase, fetchUserByIdUseCase } from "./usecases";

const app = createApp(
  configService,
  fetchOrCreateUserByEmailUseCase,
  fetchUserByIdUseCase
);

app.listen(app.get("port"), () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${app.get("port")}`
  );
});

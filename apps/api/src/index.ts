import errorHandler from "errorhandler";

import app from "./app";
import { configService } from "./services";
import logger from "./services/logger.service";

/**
 * Error Handler. Provides full stack
 */
if (configService.NODE_ENV === "development") {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  logger.info(
    `App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
  logger.info("Press CTRL-C to stop\n");
});

export default server;

import { User } from "@retrobox/types";

import { userRepository } from "../../gateways";
import { Result } from "../../lib/types";
import { defaultLogger } from "../../services";

const logger = defaultLogger.child({
  service: "fetch-or-create-user-by-email",
});

const execute = async (email: string): Result<User> => {
  if (!email || !email.length) return [new Error("No email provided")];
  const [err, user] = await userRepository.fetchOrCreateByEmail(email);
  if (err) {
    logger.error(err);
    return [err];
  }
  return [null, user];
};

export default {
  execute,
};

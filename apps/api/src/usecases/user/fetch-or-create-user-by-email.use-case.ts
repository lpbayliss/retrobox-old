import { User } from "@retrobox/types";
import { userRepository } from "../../gateways";
import { Result } from "../../lib/types";
import logger from "../../services/logger";

const execute = async (email: string): Result<User> => {
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

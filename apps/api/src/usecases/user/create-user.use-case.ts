import { User } from "@retrobox/types";
import { userRepository } from "../../gateways";
import { Result } from "../../lib/types";

const execute = async (email: string, nickname: string): Result<User> => {
  const [err, user] = await userRepository.create(email, nickname);
  if (err) return [err];
  return [null, user];
};

export default {
  execute,
};

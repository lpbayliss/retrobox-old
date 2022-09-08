import { User } from "@retrobox/types";
import { userRepository } from "../../gateways";
import { Result } from "../../lib/types";

const execute = async (email: string): Result<User> => {
  const [err, user] = await userRepository.fetchOrCreateByEmail(email);
  if (err) return [err];
  return [null, user];
}

export default {
  execute
}
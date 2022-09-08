import { User } from "@retrobox/types";
import { userRepository } from "../../gateways";
import { Result } from "../../lib/types";

const execute = async (id: string): Result<User> => {
  const [err, user] = await userRepository.fetchById(id);
  if (err) return [err];
  return [null, user];
}

export default {
  execute
}
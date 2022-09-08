import { Drop } from "@retrobox/types";
import { dropRepository } from "../../gateways";
import { Result } from "../../lib/types";

const execute = async (id: string): Result<Drop> => {
  const [err, drop] = await dropRepository.fetch(id);
  if (err) return [err];
  return [null, drop];
};

export default {
  execute
}

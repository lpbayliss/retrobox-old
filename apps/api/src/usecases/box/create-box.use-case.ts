import { Box } from "@retrobox/types";
import { boxRepository } from "../../gateways";
import { Result } from "../../lib/types";

const execute = async (name: string): Result<Box> => {
  const [err, box] = await boxRepository.create(name);
  if (err) return [err];
  return [null, box];
};

export default {
  execute,
};

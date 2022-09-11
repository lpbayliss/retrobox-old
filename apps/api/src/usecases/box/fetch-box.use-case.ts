import { Box } from "@retrobox/types";
import { boxRepository } from "../../gateways";
import { Result } from "../../lib/types";

const execute = async (id: string): Result<Box> => {
  const [err, box] = await boxRepository.fetch(id);
  if (err) return [err];
  return [null, box];
};

export default {
  execute,
};

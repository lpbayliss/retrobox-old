import { Item } from "@retrobox/types";
import { itemRepository } from "../../gateways";
import { Result } from "../../lib/types";

const execute = async (
  boxId: string,
  message: string,
  author?: string
): Result<Item> => {
  const [err, item] = await itemRepository.create(boxId, message, author);
  if (err) return [err];
  return [null, item];
};

export default {
  execute,
};

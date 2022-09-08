import { Item } from "@retrobox/types";
import { itemRepository } from "../../gateways";
import { Result } from "../../lib/types";

const execute = async (name: string): Result<Item> => {
  const [err, item] = await itemRepository.remove(name);
  if (err) return [err];
  return [null, item];
}

export default {
  execute
}

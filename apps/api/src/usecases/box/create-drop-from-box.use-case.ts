import { Drop } from "@retrobox/types";
import { boxRepository, dropRepository } from "../../gateways";
import { InternalError } from "../../lib/errors";
import { Result } from "../../lib/types";

const execute = async (boxId: string): Result<Drop> => {
  const [itemCountErr, itemCount] = await boxRepository.fetchItemCount(boxId);
  if (itemCountErr) return [itemCountErr];
  if (itemCount === 0)
    return [new InternalError("NoItemsInBox", "Cannot create an empty drop")];

  const [createErr, emptyDrop] = await dropRepository.create(boxId);
  if (createErr) return [createErr];

  const [emptyErr, itemIds] = await boxRepository.empty(boxId);
  if (emptyErr) return [emptyErr];

  const [addErr, drop] = await dropRepository.addItems(emptyDrop.id, itemIds);
  if (addErr) return [addErr];
  return [null, drop];
};

export default {
  execute,
};

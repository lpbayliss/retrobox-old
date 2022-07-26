import to from "await-to-js";
import { InternalError } from "../lib/errors";
import { IItemRepository, RemovedItemResult } from "../lib/types";

export const createItemInteractor = (itemRepository: IItemRepository) => {
  const removeItem = async (name: string): Promise<RemovedItemResult> => {
    const [err, result] = await to(itemRepository.deleteItem(name));

    if (err)
      return [
        new InternalError("RemoveItemFailed", "Failed to remove item", err),
        null,
      ];

    return [null, result];
  };

  return {
    removeItem,
  };
};

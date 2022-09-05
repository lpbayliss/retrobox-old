import { InternalError } from "../lib/errors";
import { IItemRepository, RemovedItemInteractorResult } from "../lib/types";

export const createItemInteractor = (itemRepository: IItemRepository) => ({
  removeItem: async (name: string): Promise<RemovedItemInteractorResult> => {
    const [err, result] = await itemRepository.delete(name);

    if (err)
      return [
        new InternalError("RemoveItemFailed", "Failed to remove item", err),
      ];

    return [null, result];
  },
});

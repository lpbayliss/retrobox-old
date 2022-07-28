import { InternalError, NotFoundError } from "../lib/errors";
import {
  IDropRepository,
  IItemRepository,
  IBoxRepository,
  CreatedBoxInteractorResult,
  AddedItemInteractorResult,
  CreateDropInteractorResult,
  FetchBoxInteractorResult,
} from "../lib/types";

export const createBoxInteractor = (
  boxRepository: IBoxRepository,
  itemRepository: IItemRepository,
  dropRepository: IDropRepository
) => ({
  createNewBox: async (name: string): Promise<CreatedBoxInteractorResult> => {
    const [err, boxId] = await boxRepository.create(name);

    if (err)
      return [
        new InternalError("CreateBoxFailed", "Failed to create new box", err),
      ];

    return [null, boxId];
  },
  fetchBox: async (id: string): Promise<FetchBoxInteractorResult> => {
    const [err, box] = await boxRepository.fetch(id);

    if (err)
      return [
        new InternalError("CreateBoxFailed", "Failed to create new box", err),
      ];

    if (!box) return [new NotFoundError(`Could not find box for id ${id}`)];

    const allDrops = box.drops;
    const latestDrop = allDrops.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    )[0];

    return [
      null,
      {
        id: box.id,
        name: box.name,
        itemCount: box.itemCount,
        allDrops,
        latestDrop,
      },
    ];
  },
  addItemToBox: async (
    boxId: string,
    message: string,
    author?: string
  ): Promise<AddedItemInteractorResult> => {
    const [err, itemId] = await itemRepository.create(boxId, message, author);

    if (err)
      return [
        new InternalError(
          "AddItemFailed",
          `Failed to add item to box with id ${boxId}`,
          err
        ),
      ];

    return [null, itemId];
  },
  createDropFromBox: async (
    boxId: string
  ): Promise<CreateDropInteractorResult> => {
    const [createErr, dropId] = await dropRepository.create(boxId);
    if (createErr)
      return [
        new InternalError(
          "CreateDropFailed",
          `Failed to create drop`,
          createErr
        ),
      ];

    const [emptyErr, itemIds] = await boxRepository.empty(boxId);
    if (emptyErr)
      return [
        new InternalError(
          "EmptyBoxFailed",
          `Failed to empty box with id ${boxId}`,
          emptyErr
        ),
      ];

    const [addErr] = await dropRepository.addItems(dropId, itemIds);
    if (addErr)
      [
        new InternalError(
          "AddItemsToDropFailed",
          `Failed to add items to drop with id ${boxId}`,
          addErr
        ),
      ];

    return [null, dropId];
  },
});

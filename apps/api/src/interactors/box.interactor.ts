import to from "await-to-js";
import { InternalError } from "../lib/errors";
import {
  IDropRepository,
  IItemRepository,
  IBoxRepository,
  CreatedBoxResult,
  AddedItemResult,
  CreateDropResult,
  FetchBoxResult,
} from "../lib/types";

export const createBoxInteractor = (
  boxRepository: IBoxRepository,
  itemRepository: IItemRepository,
  dropRepository: IDropRepository
) => {
  const createNewBox = async (name: string): Promise<CreatedBoxResult> => {
    const [err, boxId] = await to(boxRepository.create(name));

    if (err)
      return [
        new InternalError("CreateBoxFailed", "Failed to create new box", err),
        null,
      ];

    return [null, boxId];
  };

  const fetchBox = async (id: string): Promise<FetchBoxResult> => {
    const [err, box] = await to(boxRepository.fetch(id));

    if (err)
      return [
        new InternalError("CreateBoxFailed", "Failed to create new box", err),
        null,
      ];

    return [null, box];
  };

  const addItemToBox = async (
    boxId: string,
    message: string,
    author?: string
  ): Promise<AddedItemResult> => {
    const [err, result] = await to(
      itemRepository.createItem(boxId, message, author)
    );

    if (err)
      return [
        new InternalError(
          "AddItemFailed",
          `Failed to add item to box with id ${boxId}`,
          err
        ),
        null,
      ];

    return [null, result.id];
  };

  const createDropFromBox = async (
    boxId: string
  ): Promise<CreateDropResult> => {
    const [createErr, dropId] = await to(dropRepository.create(boxId));
    if (createErr)
      return [
        new InternalError(
          "CreateDropFailed",
          `Failed to create drop`,
          createErr
        ),
        null,
      ];

    const [emptyErr, itemIds] = await to(boxRepository.empty(boxId));
    if (emptyErr)
      return [
        new InternalError(
          "EmptyBoxFailed",
          `Failed to empty box with id ${boxId}`,
          emptyErr
        ),
        null,
      ];

    const [addErr] = await to(dropRepository.addItems(dropId, itemIds));
    if (addErr)
      [
        new InternalError(
          "AddItemsToDropFailed",
          `Failed to add items to drop with id ${boxId}`,
          addErr
        ),
        null,
      ];

    return [null, dropId];
  };

  return {
    createNewBox,
    fetchBox,
    addItemToBox,
    createDropFromBox,
  };
};

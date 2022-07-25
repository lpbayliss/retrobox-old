import {
  AddedItemResult,
  CountItemsResult,
  CreatedBoxResult,
  CreateDropResult,
  GetTimeOfDropResult,
  IBoxRepository,
  RemoveItemResult,
} from "../lib/types/box.types";

export const createBoxInteractor = (boxRepository: IBoxRepository) => {
  // Create a new box
  const createNewBox = async (name: string): Promise<CreatedBoxResult> => "000";

  // Insert a new retro item
  const addItemToBox = async (
    boxId: string,
    message: string,
    author?: string
  ): Promise<AddedItemResult> => ({ id: "000", message: "Hello world" });

  // Allow removal of item briefly after inserting (undo)
  const removeItemFromBox = async (
    boxId: string,
    itemId: string
  ): Promise<RemoveItemResult> => true;

  // Show how many items are in the box
  const countItemsInBox = async (boxId: string): Promise<CountItemsResult> =>
    10;

  // Empty the box and move items into a drop
  const createDropFromBox = async (boxId: string): Promise<CreateDropResult> =>
    "000";

  // Find time of last drop
  const getTimeOfLastDrop = async (
    boxId: string
  ): Promise<GetTimeOfDropResult> => new Date();

  return {
    createNewBox,
    addItemToBox,
    removeItemFromBox,
    countItemsInBox,
    createDropFromBox,
    getTimeOfLastDrop,
  };
};

import { InteractorResult } from "./app.types";

export type RemovedItemResult = InteractorResult<true>;

export interface IItemRepository {
  createItem(boxId: string, message: string, author?: string): Promise<{ id: string }>;
  deleteItem(itemId: string): Promise<true>;
}
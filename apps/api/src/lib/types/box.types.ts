import { InteractorResult } from "./app.types";

export type CreatedBoxResult = InteractorResult<string>;
export type FetchBoxResult = InteractorResult<{}>;
export type AddedItemResult = InteractorResult<string>;
export type CreateDropResult = InteractorResult<string>;

export interface IBoxRepository {
  create(boxName: string): Promise<string>;
  fetch(boxId: string): Promise<{
    id: string;
    itemCount: number;
    drops: { id: string; itemCount: number; createdAt: Date }[];
  }>;
  empty(boxId: string): Promise<string[]>;
}

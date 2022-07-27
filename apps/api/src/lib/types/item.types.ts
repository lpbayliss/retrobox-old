import { InteractorResult, RepositoryResult } from "./app.types";

// HTTP Response Types

// Interactor Result Types
export type RemovedItemInteractorResult = InteractorResult<true>;

// Repository Result Types
export type CreateItemRepositoryResult = RepositoryResult<string>;
export type DeleteItemRepositoryResult = RepositoryResult<true>;

// Service Interfaces
export interface IItemRepository {
  create(
    boxId: string,
    message: string,
    author?: string
  ): CreateItemRepositoryResult;
  delete(itemId: string): DeleteItemRepositoryResult;
}

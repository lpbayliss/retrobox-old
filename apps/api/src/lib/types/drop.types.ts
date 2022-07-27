import { InteractorResult, RepositoryResult } from "./app.types";

// HTTP Response Types

// Interactor Result Types
export type FetchDropInteractorResult = InteractorResult<{
  id: string;
  items: { message: string; author: string | null }[];
  createdAt: Date;
}>;

// Repository Result Types
export type CreateDropRepositoryResult = RepositoryResult<string>;
export type FetchDropRepositoryResult = RepositoryResult<{
  id: string;
  items: { message: string; author: string | null }[];
  createdAt: Date;
} | null>;
export type AddItemRepositoryResult = RepositoryResult<true>;

// Service Interfaces
export interface IDropRepository {
  create(boxId: string): CreateDropRepositoryResult;
  fetch(dropId: string): FetchDropRepositoryResult;
  addItems(dropId: string, itemIds: string[]): AddItemRepositoryResult;
}

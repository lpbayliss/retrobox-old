import { InteractorResult, RepositoryResult } from "./app.types";
import { Response } from "./web.types";

// HTTP Response Types
export type CreateBoxResponse = Response<{ id: string }>;
export type FetchBoxResponse = Response<{
  id: string;
  name: string;
  itemCount: number;
  latestDrop: { id: string; itemCount: number; createdAt: Date };
  allDrops: { id: string; itemCount: number; createdAt: Date }[];
}>;
export type AddItemToBoxResponse = Response<{ id: string }>;
export type CreateDropFromBoxResponse = Response<{ id: string }>;

// Interactor Result Types
export type CreatedBoxInteractorResult = InteractorResult<string>;
export type FetchBoxInteractorResult = InteractorResult<{
  id: string;
  name: string;
  itemCount: number;
  latestDrop: { id: string; itemCount: number; createdAt: Date };
  allDrops: { id: string; itemCount: number; createdAt: Date }[];
}>;
export type AddedItemInteractorResult = InteractorResult<string>;
export type CreateDropInteractorResult = InteractorResult<string>;

// Repository Result Types
export type CreateBoxRepositoryResult = RepositoryResult<string>;
export type FetchBoxRepositoryResult = RepositoryResult<{
  id: string;
  name: string;
  itemCount: number;
  drops: { id: string; itemCount: number; createdAt: Date }[];
} | null>;
export type EmptyBoxRepositoryResult = RepositoryResult<string[]>;

// Service Interfaces
export interface IBoxRepository {
  create(boxName: string): CreateBoxRepositoryResult;
  fetch(boxId: string): FetchBoxRepositoryResult;
  empty(boxId: string): EmptyBoxRepositoryResult;
}

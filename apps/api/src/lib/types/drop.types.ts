export interface IDropRepository {
  create(boxId: string): Promise<string>;
  addItems(dropId: string, itemIds: string[]): Promise<true>;
}

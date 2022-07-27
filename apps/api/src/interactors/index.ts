import { createBoxInteractor } from "./box.interactor";
import { createItemInteractor } from "./item.interactor";
import { createDropInteractor } from "./drop.interactor";
import { boxRepository, dropRepository, itemRepository } from "../data";

export const boxInteractor = createBoxInteractor(
  boxRepository,
  itemRepository,
  dropRepository
);
export const itemInteractor = createItemInteractor(itemRepository);
export const dropInteractor = createDropInteractor(dropRepository);

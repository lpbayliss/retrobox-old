import { createBoxInteractor } from "./box.interactor";
import { createItemInteractor } from "./item.interactor";
import { createDropInteractor } from "./drop.interactor";

export const boxInteractor = createBoxInteractor({}, {}, {});
export const itemInteractor = createItemInteractor({}, {}, {});
export const dropInteractor = createDropInteractor({}, {}, {});

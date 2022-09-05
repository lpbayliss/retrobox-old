import { createBoxController } from "./box.controller";
import { createItemController } from "./item.controller";
import { createDropController } from "./drop.controller";

export const boxController = createBoxController();
export const itemController = createItemController();
export const dropController = createDropController();

export { userController } from './user'

import { prisma } from "@retrobox/database";

import { createBoxRepository } from "./box.repository";
import { createItemRepository } from "./item.repository";
import { createDropRepository } from "./drop.repository";

export const boxRepository = createBoxRepository();
export const itemRepository = createItemRepository();
export const dropRepository = createDropRepository();

export const getIsDatabaseHealthy = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (e) {
    return false;
  }
};

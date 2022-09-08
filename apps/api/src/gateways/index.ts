import { prisma } from "@retrobox/database";

export { default as boxRepository } from './box.repository'
export { default as dropRepository } from './drop.repository'
export { default as itemRepository } from './item.repository'
export { default as userRepository } from './user.repository'

export const getIsDatabaseHealthy = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (e) {
    return false;
  }
};

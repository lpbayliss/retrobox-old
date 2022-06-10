import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkHealth = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (e) {
    return false;
  } 
}

const gateway = {
  checkHealth,
};

export default gateway;
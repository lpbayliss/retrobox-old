import { Box, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkHealth = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (e) {
    return false;
  }
};

export const createBox = async (name: string): Promise<Box> => {
  const data = await prisma.box.create({
    data: { name },
    include: { itemDumps: true, items: true },
  });

  return data;
};

export const fetchBox = async (id: string): Promise<any> => {
  const data = await prisma.box.findUnique({
    where: { id },
    include: {
      items: {
        where: { isDumped: false },
        select: { body: true, submitter: true },
      },
      itemDumps: {
        select: {
          id: true,
          createdAt: true,
        },
      },
    },
  });

  return data;
};

export const createItem = async (
  boxId: string,
  body: string,
  submitter: string = null
): Promise<any> => {
  const data = await prisma.item.create({
    data: {
      body,
      submitter,
      Box: { connect: { id: boxId } },
    },
    select: {
      id: true,
      body: true,
      submitter: true,
    },
  });

  return data;
};

export const createDump = async (boxId): Promise<any> => {
  const data = await prisma.itemDump.create({
    data: { Box: { connect: { id: boxId } } },
    select: { id: true },
  });

  await prisma.item.updateMany({
    where: { boxId },
    data: { itemDumpId: data.id, isDumped: true },
  });

  await prisma.box.update({
    where: { id: boxId },
    data: { lastDump: new Date() },
  });

  return data;
};

export const fetchDump = async (dumpId): Promise<any> => {
  const data = await prisma.itemDump.findUnique({
    where: { id: dumpId },
    select: { items: true, id: true, createdAt: true },
  });

  return data;
};

const gateway = {
  checkHealth,
  createBox,
  fetchBox,
  createItem,
  createDump,
  fetchDump,
};

export default gateway;

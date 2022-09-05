import { IDropRepository } from "../lib/types";
import { prisma } from "@retrobox/database";
import to from "await-to-js";
import { NotFoundError } from "../lib/errors";

export const createDropRepository = (): IDropRepository => ({
  create: async (id) => {
    const [err, drop] = await to(
      prisma.drop.create({
        data: { box: { connect: { id } } },
        select: { id: true },
      })
    );

    if (err) return [err];

    return [null, drop.id];
  },
  fetch: async (id) => {
    const [err, drop] = await to(
      prisma.drop.findUnique({
        where: { id },
        select: {
          id: true,
          createdAt: true,
          items: { select: { message: true, author: true } },
        },
      })
    );

    if (err) return [err];

    return [null, drop];
  },
  addItems: async (id, itemIds) => {
    const [err] = await to(
      prisma.drop.update({
        where: { id },
        data: { items: { connect: itemIds.map((itemId) => ({ id: itemId })) } },
      })
    );

    if (err) return [err];

    return [null, true];
  },
});

import { IItemRepository } from "../lib/types";
import { prisma } from "@retrobox/database";
import to from "await-to-js";

export const createItemRepository = (): IItemRepository => ({
  create: async (id, message, author) => {
    const [err, drop] = await to(
      prisma.item.create({
        data: { box: { connect: { id } }, message, author },
        select: { id: true },
      })
    );

    if (err) return [err];

    return [null, drop.id];
  },
  delete: async (id) => {
    const [err] = await to(prisma.item.delete({ where: { id } }));

    if (err) return [err];

    return [null, true];
  },
});

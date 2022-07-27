import { IBoxRepository } from "../lib/types";
import { prisma } from "@retrobox/database";
import to from "await-to-js";
import { NotFoundError } from "../lib/errors";

export const createBoxRepository = (): IBoxRepository => ({
  create: async (name: string) => {
    const [err, box] = await to(
      prisma.box.create({
        data: { name },
        select: { id: true },
      })
    );

    if (err) return [err];

    return [null, box.id];
  },

  fetch: async (id) => {
    const [err, box] = await to(
      prisma.box.findUnique({
        where: { id },
        select: {
          id: true,
          _count: { select: { items: true } },
          drops: {
            select: {
              id: true,
              _count: { select: { items: true } },
              createdAt: true,
            },
          },
        },
      })
    );

    if (err) return [err];

    const mappedBox = box
      ? {
          id: box.id,
          itemCount: box._count.items,
          drops: box.drops.map((drop) => ({
            id: drop.id,
            itemCount: drop._count.items,
            createdAt: drop.createdAt,
          })),
        }
      : null;

    return [null, mappedBox];
  },

  empty: async (id) => {
    const [findErr, box] = await to(
      prisma.box.findUnique({
        where: { id },
        select: { items: { select: { id: true } } },
      })
    );

    if (findErr) return [findErr];
    if (!box) return [new NotFoundError(`Could not find box for id ${id}`)];

    const itemIds = box?.items.map((item) => item.id);

    const [updateErr] = await to(
      prisma.box.update({
        where: { id },
        data: { items: { set: [] } },
      })
    );

    if (updateErr) return [updateErr];

    return [null, itemIds];
  },
});

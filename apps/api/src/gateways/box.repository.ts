import { prisma } from "@retrobox/database";
import { Box } from "@retrobox/types";
import to from "await-to-js";
import { NotFoundError } from "../lib/errors";
import { Result } from "../lib/types";

const create = async (name: string): Result<Box> => {
  const [err, box] = await to(
    prisma.box.create({
      data: { name },
      select: {
        id: true,
        name: true,
        _count: { select: { items: true } },
        drops: {
          select: {
            id: true,
            _count: { select: { items: true } },
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      },
    })
  );

  if (err) return [err];

  return [
    null,
    {
      id: box.id,
      name: box.name,
      itemCount: box._count.items,
      latestDrop: box.drops.length ? {
        id: box.drops[0].id,
        itemCount: box.drops[0]._count.items,
        createdAt: box.drops[0].createdAt,
      } : null,
      allDrops: box.drops.map((drop) => ({
        id: drop.id,
        itemCount: drop._count.items,
        createdAt: drop.createdAt,
      })),
    },
  ];
};

const fetch = async (id: string): Result<Box> => {
  const [err, box] = await to(
    prisma.box.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
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
  if (!box) return [new NotFoundError(`Could not find box for id ${id}`)];

  return [
    null,
    {
      id: box.id,
      name: box.name,
      itemCount: box._count.items,
      latestDrop: box.drops.length ? {
        id: box.drops[0].id,
        itemCount: box.drops[0]._count.items,
        createdAt: box.drops[0].createdAt,
      } : null,
      allDrops: box.drops.map((drop) => ({
        id: drop.id,
        itemCount: drop._count.items,
        createdAt: drop.createdAt,
      })),
    },
  ];
};

const fetchItemCount = async (id: string): Result<number> => {
  const [err, box] = await to(
    prisma.box.findUnique({
      where: { id },
      select: {
        _count: { select: { items: true } },
      },
    })
  );

  if (err) return [err];
  if (!box) return [new NotFoundError(`Could not find box for id ${id}`)];

  return [null, box._count.items];
};

const empty = async (id: string): Result<string[]> => {
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
};

export default {
  create,
  fetch,
  fetchItemCount,
  empty,
};

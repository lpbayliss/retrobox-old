import { prisma } from "@retrobox/database";
import { Drop } from "@retrobox/types";
import to from "await-to-js";
import { NotFoundError } from "../lib/errors";
import { Result } from "../lib/types";

const create = async (id: string): Result<Drop> => {
  const [err, drop] = await to(
    prisma.drop.create({
      data: { box: { connect: { id } } },
      include: { items: true, _count: { select: { items: true } } },
    })
  );

  if (err) return [err];

  return [null, {
    id: drop.id,
    createdAt: drop.createdAt,
    items: drop.items.map((item) => ({ message: item.message, author: item.author || undefined })),
    itemCount: drop._count.items,
  }];
}

const fetch = async (id: string): Result<Drop> => {
  const [err, drop] = await to(
    prisma.drop.findUnique({
      where: { id },
      include: { items: true, _count: { select: { items: true } } },
    })
  );

  if (err) return [err];
  if (!drop) return [new NotFoundError(`Could not find drop for id ${id}`)];

  return [null, {
    id: drop.id,
    createdAt: drop.createdAt,
    items: drop.items.map((item) => ({ message: item.message, author: item.author || undefined })),
    itemCount: drop._count.items,
  }];
}

const addItems = async (id: string, itemIds: string[]): Result<Drop> => {
  const [err, drop] = await to(
    prisma.drop.update({
      where: { id },
      data: { items: { connect: itemIds.map((itemId) => ({ id: itemId })) } },
      include: { items: true, _count: { select: { items: true } } },
    })
  );

  if (err) return [err];
  if (!drop) return [new NotFoundError(`Could not find drop for id ${id}`)];


  return [null, {
    id: drop.id,
    createdAt: drop.createdAt,
    items: drop.items.map((item) => ({ message: item.message, author: item.author || undefined })),
    itemCount: drop._count.items,
  }];
}

export default {
  create,
  fetch,
  addItems
}

import { prisma } from "@retrobox/database";
import { Item } from "@retrobox/types";
import to from "await-to-js";

import { NotFoundError } from "../lib/errors";
import { Result } from "../lib/types";

const create = async (
  id: string,
  message: string,
  author?: string
): Result<Item> => {
  const [err, item] = await to(
    prisma.item.create({
      data: { box: { connect: { id } }, message, author },
    })
  );
  if (err) return [err];
  return [null, { message: item.message, author: item.author || undefined }];
};

const remove = async (id: string): Result<Item> => {
  const [err, item] = await to(prisma.item.delete({ where: { id } }));
  if (err) return [err];
  if (!item) return [new NotFoundError(`Could not find item for id ${id}`)];
  return [null, { message: item.message, author: item.author || undefined }];
};

export default {
  create,
  remove,
};

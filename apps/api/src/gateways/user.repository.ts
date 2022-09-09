import { prisma } from "@retrobox/database";
import { User } from "@retrobox/types";
import to from "await-to-js";

import { NotFoundError } from "../lib/errors";
import { Result } from "../lib/types";

const create = async (email: string, nickname?: string): Result<User> => {
  const [err, user] = await to(
    prisma.user.create({ data: { email, nickname } })
  );

  if (err) return [err];
  if (user === null) return [new NotFoundError("Could not create new user")];

  return [
    null,
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname || undefined,
    },
  ];
};

const fetchById = async (id: string): Result<User> => {
  const [err, user] = await to(prisma.user.findUnique({ where: { id } }));

  if (err) return [err];
  if (user === null) return [new NotFoundError("Could not find user")];

  return [
    null,
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname || undefined,
    },
  ];
};

const fetchByEmail = async (email: string): Result<User> => {
  const [err, user] = await to(prisma.user.findUnique({ where: { email } }));

  if (err) return [err];
  if (user === null) return [new NotFoundError("Could not find user")];

  return [
    null,
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname || undefined,
    },
  ];
};

const fetchOrCreateByEmail = async (email: string): Result<User> => {
  const [err, user] = await to(
    prisma.user.upsert({ where: { email }, update: {}, create: { email } })
  );

  if (err) return [err];

  return [
    null,
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname || undefined,
    },
  ];
};

export default {
  create,
  fetchByEmail,
  fetchById,
  fetchOrCreateByEmail,
};

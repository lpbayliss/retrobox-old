import { prisma } from "@retrobox/database";
import to from "await-to-js";
import { NotFoundError } from "../../lib/errors";
import { IUserRepository } from "./user.interface";

const createUserRepository = (): IUserRepository => ({
  create: async (email, nickname) => {
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
        nickname: user?.nickname,
      },
    ];
  },
  fetchById: async (id) => {
    const [err, user] = await to(prisma.user.findUnique({ where: { id } }));

    if (err) return [err];
    if (user === null) return [new NotFoundError("Could not find user")];

    return [
      null,
      {
        id: user.id,
        email: user.email,
        nickname: user?.nickname,
      },
    ];
  },
  fetchByEmail: async (email) => {
    const [err, user] = await to(prisma.user.findUnique({ where: { email } }));

    if (err) return [err];
    if (user === null) return [new NotFoundError("Could not find user")];

    return [
      null,
      {
        id: user.id,
        email: user.email,
        nickname: user?.nickname,
      },
    ];
  },
  fetchOrCreateByEmail: async (email) => {
    const [err, user] = await to(
      prisma.user.upsert({ where: { email }, update: {}, create: { email } })
    );

    if (err) return [err];

    return [
      null,
      {
        id: user.id,
        email: user.email,
        nickname: user?.nickname,
      },
    ];
  },
});

export default createUserRepository;

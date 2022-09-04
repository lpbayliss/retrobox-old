import { Request } from "express";
import { getIsDatabaseHealthy } from "../data";
import { Response } from "../lib/types";

type FetchHealthResponse = Response<{
  server: boolean;
  database: boolean;
}>;

export const createHealthController = () => {
  const getHealth = async (_req: Request, res: FetchHealthResponse) => {
    const isDatabaseHealthy = await getIsDatabaseHealthy();
    res.status(200).send({
      data: {
        server: true,
        database: isDatabaseHealthy,
      },
      meta: null,
    });
  };

  return {
    getHealth,
  };
};

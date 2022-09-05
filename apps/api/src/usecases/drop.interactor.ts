import { InternalError, NotFoundError } from "../lib/errors";
import { FetchDropInteractorResult, IDropRepository } from "../lib/types";

export const createDropInteractor = (dropRepository: IDropRepository) => ({
  fetchDrop: async (id: string): Promise<FetchDropInteractorResult> => {
    const [err, drop] = await dropRepository.fetch(id);

    if (err)
      return [new InternalError("FetchDropFailed", "Failed to fetch box", err)];

    if (!drop) return [new NotFoundError(`Could not find drop for id ${id}`)];

    return [null, drop];
  },
});

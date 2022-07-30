import { client, CreateBoxResponseData, FetchBoxResponseData } from ".";

const addItem = async (boxId: string, message: string, author?: string) =>
  (await client.post<CreateBoxResponseData>(`/boxes/${boxId}/add-item`, { message, author }))
    .data;

export default addItem;

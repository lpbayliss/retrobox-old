import { client, CreateBoxResponseData, FetchBoxResponseData } from ".";

const createDrop = async (boxId: string) =>
  (await client.post<CreateBoxResponseData>(`/boxes/${boxId}/create-drop`))
    .data;

export default createDrop;

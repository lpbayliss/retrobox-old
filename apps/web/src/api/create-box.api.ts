import { client, CreateBoxResponseData, FetchBoxResponseData } from ".";

const createBox = async (name: string) =>
  (await client.post<CreateBoxResponseData>(`/boxes`, { name })).data;

export default createBox;

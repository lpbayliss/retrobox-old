import { client, FetchBoxResponseData } from ".";

const getBox = async (boxId: string) =>
  (await client.get<FetchBoxResponseData>(`/boxes/${boxId}`)).data;

export default getBox;

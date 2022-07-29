import { client, FetchDropResponseData } from ".";

const getDrop = async (dropId: string) =>
  (await client.get<FetchDropResponseData>(`/drops/${dropId}`)).data;

export default getDrop;

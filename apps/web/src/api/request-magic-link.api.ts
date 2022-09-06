import { client } from ".";

const requestMagicLink = async (destination: string) =>
  (await client.post(`/auth/login`, { destination })).data;

export default requestMagicLink;

import { client } from ".";

const sendToken = async (token: string) =>
  (await client.get(`/auth/login/callback`, { params: { token } }));

export default sendToken;
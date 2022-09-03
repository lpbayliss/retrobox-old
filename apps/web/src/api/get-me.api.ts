import { client } from ".";

const getMe = async (token: string) => (await client.get(`/me`)).data;

export default getMe;

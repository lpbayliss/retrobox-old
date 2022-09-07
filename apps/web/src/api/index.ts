import to from "await-to-js";
import axios from "axios";
import { IncomingHttpHeaders } from "http";

// TYPES

export type Nullable<T> = T | null;
export type RequestFunc<Input = {}, Output = {}> = (
  input: Input,
  headers?: IncomingHttpHeaders
) => Promise<Nullable<Output>>;

export type ResponseData<Body, Meta = {}> = {
  data: Body;
  meta: Meta;
};

export type CreateResult = { id: string };
export type Drop = {
  id: string;
  itemCount: number;
  createdAt: Date;
  items: [];
};
export type Item = { message: string; author: string | null };
export type Box = {
  id: string;
  name: string;
  itemCount: number;
  latestDrop: Omit<Drop, "items">;
  allDrops: Omit<Drop, "items">[];
};
export type CreateBoxResponseData = ResponseData<CreateResult>;
export type CreateDropResponseData = ResponseData<CreateResult>;
export type FetchBoxResponseData = ResponseData<Box>;
export type FetchDropResponseData = ResponseData<Drop>;
export type AddItemResponseData = ResponseData<CreateResult>;

// CLIENT

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  withCredentials: true,
});

// REQUESTS

export const getBox: RequestFunc<{ boxId: string }, Box> = async (
  { boxId },
  headers
) => {
  const [err, res] = await to(
    client.get<FetchBoxResponseData>(`/boxes/${boxId}`, {
      ...(headers && { headers: { cookie: String(headers.cookie) } }),
    })
  );
  if (err || !res.data) return null;
  return res.data.data;
};

export const getDrop: RequestFunc<{ dropId: string }, Drop> = async (
  { dropId },
  headers
) => {
  const [err, res] = await to(
    client.get<FetchDropResponseData>(`/drops/${dropId}`, {
      ...(headers && { headers: { cookie: String(headers.cookie) } }),
    })
  );
  if (err || !res.data) return null;
  return res.data.data;
};

export const addItem: RequestFunc<
  { boxId: string; message: string; author?: string },
  CreateResult
> = async ({ boxId, message, author }, headers) => {
  const [err, res] = await to(
    client.post<AddItemResponseData>(
      `/boxes/${boxId}/add-item`,
      { message, author },
      {
        ...(headers && { headers: { cookie: String(headers.cookie) } }),
      }
    )
  );
  if (err || !res.data) return null;
  return res.data.data;
};

export const createBox: RequestFunc<{ name: string }, CreateResult> = async (
  { name },
  headers
) => {
  const [err, res] = await to(
    client.post<CreateBoxResponseData>(
      `/boxes`,
      { name },
      {
        ...(headers && { headers: { cookie: String(headers.cookie) } }),
      }
    )
  );
  if (err || !res.data) return null;
  return res.data.data;
};

export const createDrop: RequestFunc<{ boxId: string }, CreateResult> = async (
  { boxId },
  headers
) => {
  const [err, res] = await to(
    client.post<CreateDropResponseData>(
      `/boxes/${boxId}/create-drop`,
      {},
      {
        ...(headers && { headers: { cookie: String(headers.cookie) } }),
      }
    )
  );
  if (err || !res.data) return null;
  return res.data.data;
};

export const getMe: RequestFunc<{}, { id: string; email: string; nickname?: string }> =
  async (_input, headers) => {
    const [err, res] = await to(
      client.get(`/me`, {
        ...(headers && { headers: { cookie: String(headers.cookie) } }),
      })
    );
    if (err || !res.data) return null;
    return res.data.data;
  };

async (token: string) => (await client.get(`/me`)).data;

export const requestMagicLink: RequestFunc<{ destination: string }, null> =
  async ({ destination }) =>
    (await client.post(`/auth/login`, { destination })).data;

export const sendToken: RequestFunc<{ boxId: string }, null> = async (
  token: string
) => await client.get(`/auth/login/callback`, { params: { token } });

import to from "await-to-js";
import { default as instance } from "./instance";

type Item = Partial<{
  id: string;
  submitter: string;
  body: string;
}>;

type Dump = Partial<{
  id: string;
  items: Item[];
  createdAt: Date;
}>;

type Box = Partial<{
  id: string;
  name: string;
  lastDump: Date;
  items: Item[];
  itemDumps: Dump[];
}>;

export const createBox = async (name: string): Promise<Box> => {
  const [err, res] = await to(instance.post<Box>("/box", { name }));
  if (err) throw err;
  return res.data;
};

export const fetchBoxWithId = async (id: string): Promise<Box> => {
  const [err, res] = await to(instance.get<Box>(`/box/${id}`));
  if (err) throw err;
  return res.data;
};

export const createDumpForBoxWithId = async (id: string): Promise<Dump> => {
  const [err, res] = await to(
    instance.post<Dump>(`/box/${id}/dump`)
  );
  if (err) throw err;
  return res.data;
};

export const fetchDumpWithId = async (id: string): Promise<Dump> => {
  const [err, res] = await to(instance.get<Dump>(`/dump/${id}`));
  if (err) throw err;
  return res.data;
};

export const addItemToBoxWithId = async (
  id: string,
  body: string,
  submitter?: string
): Promise<Item> => {
  const [err, res] = await to(
    instance.post<Item>(`/box/${id}/item`, { body, submitter })
  );
  if (err) throw err;
  return res.data;
};

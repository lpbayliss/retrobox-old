import axios from "axios";

import { default as getBox } from "./get-box.api";
import { default as createBox } from "./create-box.api";
import { default as getDrop } from "./get-drop.api";
import { default as addItem } from "./add-item.api";
import { default as createDrop } from "./create-drop.api";
import { default as sendToken } from "./send-token.api";
import { default as getMe } from "./get-me.api";

export type ResponseData<Body, Meta = {}> = {
  data: Body;
  meta: Meta;
};

export type CreateBoxResponseData = ResponseData<{ id: string }>;
export type CreateDropResponseData = ResponseData<{ id: string }>;

export type FetchBoxResponseData = ResponseData<{
  id: string;
  name: string;
  itemCount: number;
  latestDrop: { id: string; itemCount: number; createdAt: Date };
  allDrops: { id: string; itemCount: number; createdAt: Date }[];
}>;

export type FetchDropResponseData = ResponseData<{
  id: string;
  createdAt: Date;
  items: { message: string; author: string | null }[];
}>;
export type AddItemResponseData = ResponseData<{ id: string }>;

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  withCredentials: true,
});

const api = {
  createBox,
  getBox,
  getDrop,
  addItem,
  createDrop,
  sendToken,
  getMe,
};

export default api;

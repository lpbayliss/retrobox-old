import axios from "axios";

export { default as getBox } from "./get-box.api";
export { default as getDrop } from "./get-drop.api";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
});

export type ResponseData<Body, Meta = {}> = {
  data: Body;
  meta: Meta;
};

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

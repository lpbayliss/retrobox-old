import { IncomingHttpHeaders } from "http";
import { Nullable } from "./util";

/// NEW

export type ProblemJson = {
  title: string;
  status: number;
  detail: string;
  instance: string;
};

export type ResponseBody<Data, Meta> = {
  data: Data;
  meta: Meta;
};

export type RetroboxResponse<Data, Meta> =
  | ResponseBody<Data, Meta>
  | ProblemJson;

/// OLD

export type RequestFunc<Input = {}, Output = {}> = (
  input: Input,
  headers?: IncomingHttpHeaders
) => Promise<Nullable<Output>>;

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

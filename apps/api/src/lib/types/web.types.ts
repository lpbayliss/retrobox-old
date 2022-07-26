import { Response as ExpressResponse } from "express";

export type ProblemJson = {
  title: string;
  status: number;
  detail: string;
  instance: string;
};

export type ResponseData<Body, Meta> = {
  data: Body;
  meta: Meta;
}

export type Response<Data, Meta = any> = ExpressResponse<ProblemJson | ResponseData<Data, Meta>>
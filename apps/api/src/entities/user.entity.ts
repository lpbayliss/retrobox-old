import { Nullable } from "../lib/types";

export interface IUser {
  id: string;
  email: string;
  nickname: Nullable<string>
}
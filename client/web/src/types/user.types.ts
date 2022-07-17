import { IList } from "./lists.types";

export interface IUser {
  _id?: number;
  email: string;
  createdDate: Date;
  updatedDate?: Date;
  lists: IList[];
}

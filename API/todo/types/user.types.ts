import { Types } from "mongoose";
import { IList } from "./list.types";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  createdDate: Date;
  updatedDate?: Date;
  lists: Types.DocumentArray<IList>;
}

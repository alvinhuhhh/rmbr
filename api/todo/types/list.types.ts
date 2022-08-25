import { Types } from "mongoose";
import { ITodo } from "./todo.types";

export interface IList {
  _id: Types.ObjectId;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  deleted: boolean;
  title: string;
  todos: Types.DocumentArray<ITodo>;
}

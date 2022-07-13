import { Types } from "mongoose";
import { ITodo } from "./todo.types";

export interface IList {
  _id?: Types.ObjectId;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  title: string;
  todos: Types.DocumentArray<ITodo>;
}

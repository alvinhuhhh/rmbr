import { ITodo } from "./todo.types";

export interface IList {
  _id?: number;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  title: string;
  todos: Array<ITodo>;
  sharedUsers: Array<{ user: string }>;
}

import { ITodo } from "./todo.types";

export interface IList {
  _id?: number;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  deleted: boolean;
  title: string;
  todos: Array<ITodo>;
  sharingId?: number;
}

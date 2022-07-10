import { Todo } from "./todo.types";

export interface List {
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  title: string;
  todos: Todo;
}

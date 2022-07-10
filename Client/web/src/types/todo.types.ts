export interface Todo {
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  title: string;
  description: string | null;
  done: boolean;
}

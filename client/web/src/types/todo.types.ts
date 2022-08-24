export interface ITodo {
  _id?: number;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  title: string;
  description?: string;
  done: boolean;
  priority: number;
}

export interface ITodo {
  _id?: number;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  deleted: boolean;
  title: string;
  notes?: string;
  done: boolean;
  priority: number;
}

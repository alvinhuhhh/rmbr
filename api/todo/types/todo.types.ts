import { Types } from "mongoose";

export interface ITodo {
  _id: Types.ObjectId;
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

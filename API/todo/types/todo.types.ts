import { Types } from "mongoose";

export interface ITodo {
  _id?: Types.ObjectId;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  title: string;
  description?: string;
  done: boolean;
}

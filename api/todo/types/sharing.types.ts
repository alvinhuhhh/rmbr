import { Types } from "mongoose";

export interface ISharing {
  _id: Types.ObjectId;
  createdDate: Date;
  updatedDate?: Date;
  owner: string;
  users: Types.DocumentArray<{ email: string }>;
  listId: Types.ObjectId;
}

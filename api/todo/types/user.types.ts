import { Types } from "mongoose";
import { IList } from "./list.types";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  givenName: string;
  familyName: string;
  profilePicUrl: string;
  email: string;
  createdDate: Date;
  updatedDate?: Date;
  lists: Types.DocumentArray<IList>;
  sharedLists: Types.DocumentArray<{ email: string; listId: number }>;
}

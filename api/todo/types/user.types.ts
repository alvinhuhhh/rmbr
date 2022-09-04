import { Types } from "mongoose";
import { IList } from "./list.types";

export interface IUser {
  _id: Types.ObjectId;
  createdDate: Date;
  updatedDate?: Date;
  fullName: string;
  givenName: string;
  familyName: string;
  profilePicUrl: string;
  email: string;
  lists: Types.DocumentArray<IList>;
  sharedLists: Types.DocumentArray<{ email: string; listId: Types.ObjectId }>;
}

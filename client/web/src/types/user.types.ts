import { IList } from "./lists.types";

export interface IUser {
  _id?: number;
  fullName: string;
  givenName: string;
  familyName: string;
  profilePicUrl: string;
  email: string;
  createdDate: Date;
  updatedDate?: Date;
  lists: Array<IList>;
  sharedLists: Array<{ user: string; listId: number }>;
}

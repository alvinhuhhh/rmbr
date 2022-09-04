import { IList } from "./lists.types";

export interface IUser {
  _id?: number;
  createdDate: Date;
  updatedDate?: Date;
  fullName: string;
  givenName: string;
  familyName: string;
  profilePicUrl?: string;
  email: string;
  lists: Array<IList>;
}

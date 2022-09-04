import { Schema, model } from "mongoose";
import { IUser } from "../types/user.types";
import listSchema from "./list";

const userSchema = new Schema<IUser>({
  createdDate: {
    type: Date,
    required: true,
  },
  updatedDate: {
    type: Date,
  },
  fullName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  givenName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  familyName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  profilePicUrl: {
    type: String,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
  },
  lists: [listSchema],
});

const User = model<IUser>("User", userSchema);
export default User;

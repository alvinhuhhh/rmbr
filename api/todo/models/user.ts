import { Schema, model } from "mongoose";
import { IUser } from "../types/user.types";
import listSchema from "./list";

const userSchema = new Schema<IUser>({
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
  createdDate: {
    type: Date,
    required: true,
  },
  updatedDate: {
    type: Date,
  },
  lists: [listSchema],
  sharedLists: [
    {
      user: String,
      listId: Schema.Types.ObjectId,
    },
  ],
});

const User = model<IUser>("User", userSchema);
export default User;

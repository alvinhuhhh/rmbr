import { Schema, model } from "mongoose";
import { IUser } from "../types/user.types";
import listSchema from "./list";

const userSchema = new Schema<IUser>({
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
});

const User = model<IUser>("User", userSchema);
export default User;

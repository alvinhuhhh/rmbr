import { Schema, model } from "mongoose";
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

const User = model("User", userSchema);
export default User;

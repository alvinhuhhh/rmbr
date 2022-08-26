import { Schema } from "mongoose";
import { IList } from "../types/list.types";
import todoSchema from "./todo";

const listSchema = new Schema<IList>({
  createdBy: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  updatedBy: {
    type: String,
  },
  updatedDate: {
    type: Date,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    maxLength: 100,
    required: true,
  },
  todos: [todoSchema],
  sharedUsers: [{ email: String }],
});

export default listSchema;

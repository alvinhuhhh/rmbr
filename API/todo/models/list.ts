import { Schema } from "mongoose";
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
  title: {
    type: String,
    maxLength: 100,
    required: true,
  },
  todos: [todoSchema],
});

export default listSchema;

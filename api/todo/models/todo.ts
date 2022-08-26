import { Schema } from "mongoose";
import { ITodo } from "../types/todo.types";

const todoSchema = new Schema<ITodo>({
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
  notes: {
    type: String,
    maxLength: 200,
  },
  done: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
});

export default todoSchema;

import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
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
  description: {
    type: String,
    maxLength: 200,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

const listSchema = new Schema({
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

const userSchema = new Schema({
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

const User = mongoose.model("User", userSchema);
export default User;

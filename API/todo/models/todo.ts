import mongoose from "mongoose";
const { Schema } = mongoose;

var todoSchema = new Schema({
  createdBy: {
    type: String,
    required: [true, "createdBy is required."],
  },
  createdDate: {
    type: Date,
    required: [true, "createdDate is required."],
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
  },
  description: {
    type: String,
    maxLength: 200,
  },
  done: {
    type: Boolean,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;

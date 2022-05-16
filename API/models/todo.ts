var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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
    maxlength: 200,
  },
  done: {
    type: Boolean,
  },
});

todoSchema.virtual("url").get(() => {
  return "/todo/" + this._id;
});

module.exports = mongoose.model("Todo", todoSchema);

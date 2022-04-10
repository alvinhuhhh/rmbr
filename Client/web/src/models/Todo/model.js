export default function TodoModel({
  createdBy,
  createdDate,
  updatedBy,
  updatedDate,
  title,
  description,
  done,
}) {
  let model = {
    createdBy: createdBy,
    createdDate: createdDate,
    updatedBy: updatedBy,
    updatedDate: updatedDate,
    title: title,
    description: description,
    done: done,
  };
  return model;
}

const dayjs = require("dayjs");

var Todo = require("../models/todo");

// Get list of all todos (homepage)
exports.get_todo_list = async function (req, res) {
  try {
    const todoList = await Todo.find({});

    res.status(200).send(todoList);
  } catch (error) {
    res.status(500).send();
  }
};

// Get one todo item by id
exports.get_todo = async function (req, res) {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).send();
    } else {
      res.status(200).send(todo);
    }
  } catch (error) {
    res.status(500).send();
  }
};

// Create a new todo item
exports.create_todo = async function (req, res) {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
};

// Update a todo item by id
exports.update_todo = async function (req, res) {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      res.status(404).send();
    } else {
      todo.updatedBy = req.body.updatedBy;
      todo.updatedDate = req.body.updatedDate;
      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.done = req.body.done;
      todo.__v++;

      await todo.save();
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).send();
  }
};

// Delete a todo item by id
exports.delete_todo = async function (req, res) {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      res.status(404).send();
    } else {
      Todo.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
          res.status(500).send();
        } else {
          res.status(204).send();
        }
      });
    }
  } catch (error) {
    res.status(500).send();
  }
};

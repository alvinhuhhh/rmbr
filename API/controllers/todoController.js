var Todo = require("../models/todo");

// Get list of all todos (homepage)
exports.get_todo_list = async function (req, res) {
  try {
    const todoList = await Todo.find({});

    res.status(200).send(todoList);
    console.log(`[get_todo_list] Responded with status code: 200 OK`);
  } catch (error) {
    res.status(500).send();
    console.log(`[get_todo_list] Server error: ${error}`);
  }
};

// Get one todo item by id
exports.get_todo = async function (req, res) {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).send();
      console.log(`[get_todo] Error: 404 Not found`);
    } else {
      res.status(200).send(todo);
      console.log(`[get_todo] Responded with status code: 200 OK`);
    }
  } catch (error) {
    res.status(500).send();
    console.log(`[get_todo] Server error: ${error}`);
  }
};

// Create a new todo item
exports.create_todo = async function (req, res) {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).send();
    console.log(`[create_todo] Responded with status code: 201 Created`);
  } catch (error) {
    res.status(500).send();
    console.log(`[create_todo] Server error: ${error}`);
  }
};

// Update a todo item by id
exports.update_todo = async function (req, res) {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      res.status(404).send();
      console.log(`[update_todo] Error: 404 Not found`);
    } else {
      todo.updatedBy = req.body.updatedBy;
      todo.updatedDate = req.body.updatedDate;
      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.done = req.body.done;
      todo.__v++;

      await todo.save();
      res.status(204).send();
      console.log(`[update_todo] Responded with status code: 204 Updated`);
    }
  } catch (error) {
    res.status(500).send();
    console.log(`[update_todo] Server error: ${error}`);
  }
};

// Delete a todo item by id
exports.delete_todo = async function (req, res) {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      res.status(404).send();
      console.log(`[delete_todo] Error: 404 Not found`);
    } else {
      Todo.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
          res.status(500).send();
          console.log(`[delete_todo] Server error: ${err}`);
        } else {
          res.status(204).send();
          console.log(`[delete_todo] Responded with status code: 204 Deleted`);
        }
      });
    }
  } catch (error) {
    res.status(500).send();
    console.log(`[delete_todo] Server error: ${error}`);
  }
};

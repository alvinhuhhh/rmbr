import dayjs from "dayjs";
import { Request, Response } from "express";
import Todo from "../models/todo";

// Get list of all todos (homepage)
exports.getTodoList = async (req: Request, res: Response) => {
  try {
    const todoList = await Todo.find();
    res.status(200).send(todoList);
  } catch (error) {
    res.status(500).send();
  }
};

// Get one todo item by id
exports.getTodoById = async (req: Request, res: Response) => {
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
exports.createTodo = async (req: Request, res: Response) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
};

// Update a todo item by id
exports.updateTodo = async (req: Request, res: Response) => {
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
exports.deleteTodo = async (req: Request, res: Response) => {
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

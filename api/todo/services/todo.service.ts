import { Types } from "mongoose";
import User from "../models/user";
import { ITodo } from "../types/todo.types";

export default class TodoService {
  public static async GetTodos(email: string, listId: string): Promise<Types.DocumentArray<ITodo> | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) return user.lists.id(listId)?.todos;
    } catch (err) {
      console.log(err);
    }
  }

  public static async GetTodoById(
    email: string,
    listId: string,
    todoId: string
  ): Promise<(Types.Subdocument<Types.ObjectId> & ITodo) | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const todo = user.lists.id(listId)?.todos.id(todoId);
        if (todo) return todo;
      }
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateTodo(email: string, listId: string, todo: ITodo): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const todos = user.lists.id(listId)?.todos;
        if (todos) {
          // Create todo
          todo.createdBy = email;
          todo.createdDate = new Date();
          todos.push(todo);
          await user.save();

          return true;
        }
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public static async UpdateTodo(email: string, listId: string, todo: ITodo): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const todos = user.lists.id(listId)?.todos;
        if (todos) {
          const existingTodo = todos.id(todo._id);
          if (existingTodo) {
            existingTodo.updatedBy = email;
            existingTodo.updatedDate = new Date();
            existingTodo.title = todo.title;
            existingTodo.description = todo.description;
            existingTodo.done = todo.done;
            await user.save();

            return true;
          }
        }
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public static async DeleteTodo(email: string, listId: string, todoId: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const todos = user.lists.id(listId)?.todos;
        if (todos) {
          // Delete todo
          todos.pull(todoId);
          await user.save();

          return true;
        }
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

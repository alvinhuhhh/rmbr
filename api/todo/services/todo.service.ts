import User from "../models/user";
import { ITodo } from "../types/todo.types";
import { IServiceResponse } from "../types/service.types";

export default class TodoService {
  public static async GetTodos(email: string, listId: string): Promise<Array<ITodo> | null> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const list = user.lists.id(listId);
        if (list) {
          return list.todos.filter((todo) => !todo.deleted);
        }
      }
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  }

  public static async GetTodoById(email: string, listId: string, todoId: string): Promise<ITodo | null> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const list = user.lists.id(listId);
        if (list) {
          const todo = list.todos.id(todoId);
          if (todo && !todo.deleted) return todo;
        }
      }
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  }

  public static async CreateTodo(email: string, listId: string, todo: ITodo): Promise<IServiceResponse> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const todos = user.lists.id(listId)?.todos;
        if (todos) {
          // Create todo
          todo.createdBy = todo.createdBy;
          todo.createdDate = new Date();
          todo.deleted = false;
          todos.push(todo);
          await user.save();

          return { succeeded: true, message: "" };
        }
        return { succeeded: false, message: "List does not exist" };
      }
      return { succeeded: false, message: "User does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async UpdateTodo(email: string, listId: string, todo: ITodo): Promise<IServiceResponse> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const todos = user.lists.id(listId)?.todos;
        if (todos) {
          const existingTodo = todos.id(todo._id);
          if (existingTodo) {
            existingTodo.updatedBy = todo.updatedBy;
            existingTodo.updatedDate = new Date();
            existingTodo.title = todo.title;
            existingTodo.notes = todo.notes;
            existingTodo.done = todo.done;
            existingTodo.priority = todo.priority;
            await user.save();

            return { succeeded: true, message: "" };
          }
          return { succeeded: false, message: "Todo does not exist" };
        }
        return { succeeded: false, message: "List does not exist" };
      }
      return { succeeded: false, message: "User does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async DeleteTodo(email: string, listId: string, todoId: string): Promise<IServiceResponse> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const todos = user.lists.id(listId)?.todos;
        if (todos) {
          const existingTodo = todos.id(todoId);
          if (existingTodo) {
            existingTodo.updatedBy = email;
            existingTodo.updatedDate = new Date();
            existingTodo.deleted = true;
            await user.save();

            return { succeeded: true, message: "" };
          }
          return { succeeded: false, message: "Todo does not exist" };
        }
        return { succeeded: false, message: "List does not exist" };
      }
      return { succeeded: false, message: "User does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }
}

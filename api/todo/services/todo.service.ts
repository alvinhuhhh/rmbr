import User from "../models/user";
import { ITodo } from "../types/todo.types";

export default class TodoService {
  public static async GetTodos(email: string, listId: string): Promise<Array<ITodo> | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) return user.lists.id(listId)?.todos.filter((todo) => !todo.deleted);
    } catch (err) {
      console.log(err);
    }
  }

  public static async GetTodoById(email: string, listId: string, todoId: string): Promise<ITodo | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const todo = user.lists.id(listId)?.todos.id(todoId);
        if (todo && !todo.deleted) return todo;
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
          todo.deleted = false;
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
            existingTodo.notes = todo.notes;
            existingTodo.done = todo.done;
            existingTodo.priority = todo.priority;
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
          const existingTodo = todos.id(todoId);
          if (existingTodo) {
            existingTodo.updatedBy = email;
            existingTodo.updatedDate = new Date();
            existingTodo.deleted = true;
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
}

import Todo from "../models/todo";
import List from "../models/list";
import User from "../models/user";

export default class TodoService {
  public static async GetTodos(email: string, listId: string) {
    try {
      const query = User.where({ email: email });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async GetTodoById() {
    try {
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async UpdateTodo() {
    try {
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async CreateTodo() {
    try {
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async DeleteTodo() {
    try {
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

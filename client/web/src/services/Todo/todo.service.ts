import axios from "axios";
import appConfig from "../../config";
import { ITodo } from "../../types/todo.types";

export default class TodoService {
  public static async GetTodos(listId: string): Promise<ITodo[]> {
    try {
      let response = await axios.get(`${appConfig.api.url}/todo/${listId}`);
      console.log(`[GetTodos] ${response.status} ${response.statusText}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  public static async GetTodoById(listId: string, todoId: string): Promise<ITodo | undefined> {
    try {
      let response = await axios.get(`${appConfig.api.url}/todo/${listId}/${todoId}`);
      console.log(`[GetTodoById] ${response.status} ${response.statusText}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateTodo(listId: string, todo: ITodo): Promise<number | undefined> {
    try {
      let response = await axios.post(`${appConfig.api.url}/todo/${listId}`, todo);
      console.log(`[CreateTodo] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }

  public static async UpdateTodo(listId: string, todo: ITodo): Promise<number | undefined> {
    try {
      let response = await axios.put(`${appConfig.api.url}/todo/${listId}/${todo._id?.toString()}`, todo);
      console.log(`[UpdateTodo] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }

  public static async DeleteTodo(listId: string, todoId: number): Promise<number | undefined> {
    try {
      let response = await axios.delete(`${appConfig.api.url}/todo/${listId}/${todoId}`);
      console.log(`[DeleteTodo] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }
}

import axios, { AxiosResponse } from "axios";
import appConfig from "../../config";
import { ITodo } from "../../types/todo.types";

export default class TodoService {
  public static async GetTodos(email: string, listId: string): Promise<Array<ITodo>> {
    try {
      let response = await axios.get(`${appConfig.api.url}/todo/${email}/${listId}`);
      console.log(`[GetTodos] ${response.status} ${response.statusText}`);
      if (response.status === 200) return response.data;
    } catch (err: any) {
      console.log(err);
    }
    return [];
  }

  public static async GetTodoById(email: string, listId: string, todoId: string): Promise<ITodo | undefined> {
    try {
      let response = await axios.get(`${appConfig.api.url}/todo/${email}/${listId}/${todoId}`);
      console.log(`[GetTodoById] ${response.status} ${response.statusText}`);
      if (response.status === 200) return response.data;
    } catch (err: any) {
      console.log(err);
    }
  }

  public static async CreateTodo(email: string, listId: string, todo: ITodo): Promise<AxiosResponse> {
    try {
      let response = await axios.post(`${appConfig.api.url}/todo/${email}/${listId}`, todo);
      console.log(`[CreateTodo] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      console.log(err);
      return err.response;
    }
  }

  public static async UpdateTodo(email: string, listId: string, todo: ITodo): Promise<AxiosResponse> {
    try {
      let response = await axios.put(`${appConfig.api.url}/todo/${email}/${listId}/${todo._id?.toString()}`, todo);
      console.log(`[UpdateTodo] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      console.log(err);
      return err.response;
    }
  }

  public static async DeleteTodo(email: string, listId: string, todoId: number): Promise<AxiosResponse> {
    try {
      let response = await axios.delete(`${appConfig.api.url}/todo/${email}/${listId}/${todoId}`);
      console.log(`[DeleteTodo] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      console.log(err);
      return err.response;
    }
  }
}

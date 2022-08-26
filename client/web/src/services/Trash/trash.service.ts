import axios from "axios";
import appConfig from "../../config";
import { IList } from "../../types/lists.types";
import { ITodo } from "../../types/todo.types";

export default class TrashService {
  public static async GetTrash(): Promise<Array<IList | ITodo>> {
    try {
      let response = await axios.get(`${appConfig.api.url}/trash`);
      console.log(`[GetTrash] ${response.status} ${response.statusText}`);
      if (response.status === 200) return response.data;
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  public static async RestoreItem(listId: number): Promise<number | undefined> {
    try {
      let response = await axios.put(`${appConfig.api.url}/trash/${listId}`);
      console.log(`[RestoreItem] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }

  public static async DeleteItem(listId: number): Promise<number | undefined> {
    try {
      let response = await axios.delete(`${appConfig.api.url}/trash/${listId}`);
      console.log(`[DeleteItem] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }

  public static async DeleteAll(): Promise<number | undefined> {
    try {
      let response = await axios.delete(`${appConfig.api.url}/trash`);
      console.log(`[DeleteAll] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }
}

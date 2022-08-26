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
}

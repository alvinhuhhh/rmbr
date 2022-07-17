import axios from "axios";
import appConfig from "../../config";
import { IList } from "../../types/lists.types";

export default class TodoListsService {
  public static async GetLists(): Promise<IList[]> {
    try {
      let response = await axios.get(`${appConfig.api.url}/list`);
      console.log(`[GetLists] ${response.status} ${response.statusText}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  public static async GetListById(listId: string): Promise<IList | undefined> {
    try {
      let response = await axios.get(`${appConfig.api.url}/list/${listId}`);
      console.log(`[GetListById] ${response.status} ${response.statusText}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateList(list: IList): Promise<number | undefined> {
    try {
      let response = await axios.post(`${appConfig.api.url}/list/create`, list);
      console.log(`[CreateList] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }

  public static async UpdateList(list: IList): Promise<number | undefined> {
    try {
      let response = await axios.put(`${appConfig.api.url}/list/${list._id?.toString()}`, list);
      console.log(`[UpdateList] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }

  public static async DeleteList(id: number): Promise<number | undefined> {
    try {
      let response = await axios.delete(`${appConfig.api.url}/list/${id}`);
      console.log(`[DeleteList] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }
}

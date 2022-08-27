import axios from "axios";
import appConfig from "../../config";
import { IList } from "../../types/lists.types";

export default class TodoListsService {
  public static async GetLists(email: string): Promise<Array<IList>> {
    try {
      let response = await axios.get(`${appConfig.api.url}/list/${email}`);
      console.log(`[GetLists] ${response.status} ${response.statusText}`);
      if (response.status === 200) return response.data;
    } catch (err: any) {
      console.log(err);
    }
    return [];
  }

  public static async GetListById(email: string, listId: string): Promise<IList | undefined> {
    try {
      let response = await axios.get(`${appConfig.api.url}/list/${email}/${listId}`);
      console.log(`[GetListById] ${response.status} ${response.statusText}`);
      if (response.status === 200) return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateList(email: string, list: IList): Promise<number | undefined> {
    try {
      let response = await axios.post(`${appConfig.api.url}/list/${email}`, list);
      console.log(`[CreateList] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }

  public static async UpdateList(email: string, list: IList): Promise<number | undefined> {
    try {
      let response = await axios.put(`${appConfig.api.url}/list/${email}/${list._id?.toString()}`, list);
      console.log(`[UpdateList] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }

  public static async DeleteList(email: string, listId: number): Promise<number | undefined> {
    try {
      let response = await axios.delete(`${appConfig.api.url}/list/${email}/${listId}`);
      console.log(`[DeleteList] ${response.status} ${response.statusText}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }
}

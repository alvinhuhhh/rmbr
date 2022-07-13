import axios from "axios";
import appConfig from "../../config";

export default class TodoListsService {
  public static async GetLists(): Promise<IList[]> {
    try {
      const email = sessionStorage.getItem("email");
      let response = await axios.get(`${appConfig.api.url}/list/${email}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  public static async CreateList(list: IList): Promise<void> {
    try {
      const email = sessionStorage.getItem("email");
      let response = await axios.post(`${appConfig.api.url}/list/${email}/create`, list);
      console.log(`[CreateList] ${response.status} ${response.statusText}`);
    } catch (err) {
      console.log(err);
    }
  }

  public static async UpdateList(list: IList): Promise<void> {}

  public static async DeleteList(id: number): Promise<void> {
    try {
      const email = sessionStorage.getItem("email");
      let response = await axios.delete(`${appConfig.api.url}/list/${email}/${id}`);
      console.log(`[DeleteList] ${response.status} ${response.statusText}`);
    } catch (err) {
      console.log(err);
    }
  }
}

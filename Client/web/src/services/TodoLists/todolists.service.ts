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
}

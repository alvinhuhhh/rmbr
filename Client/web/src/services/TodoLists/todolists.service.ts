import axios from "axios";
import dayjs from "dayjs";
import appConfig from "../../config";

export default class TodoListsService {
  public static async GetLists(): Promise<Array<IList>> {
    const email = sessionStorage.getItem("email");
    axios
      .get(`${appConfig.api.url}/list/${email}`)
      .then((response) => {
        console.log(`[GetLists] ${response.status} ${response.statusText}`);
        return response.data;
      })
      .catch((err) => console.log(err));
    return [];
  }
}

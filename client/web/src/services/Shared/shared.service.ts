import axios, { AxiosResponse } from "axios";
import appConfig from "../../config";
import { IList } from "../../types/lists.types";

export default class SharedService {
  public static async CreateShare(targetUserEmail: string, list: IList): Promise<AxiosResponse> {
    try {
      let response = await axios.post(`${appConfig.api.url}/sharing/${targetUserEmail}`, list);
      console.log(`[CreateShare] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      return err.response;
    }
  }
}

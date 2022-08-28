import axios, { AxiosResponse } from "axios";
import appConfig from "../../config";
import { IList } from "../../types/lists.types";

export default class SharedService {
  public static async CreateShare(email: string, targetUserEmail: string, list: IList): Promise<AxiosResponse> {
    try {
      let response = await axios.post(`${appConfig.api.url}/sharing/${email}/${targetUserEmail}`, list);
      console.log(`[CreateShare] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      return err.response;
    }
  }

  public static async RemoveShare(email: string, targetUserEmail: string, list: IList): Promise<AxiosResponse> {
    try {
      let response = await axios.put(`${appConfig.api.url}/sharing/${email}/${targetUserEmail}`, list);
      console.log(`[RemoveShare] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      return err.response;
    }
  }

  public static async GetSharedLists(email: string): Promise<Array<IList>> {
    try {
      let response = await axios.get(`${appConfig.api.url}/sharing/list/${email}`);
      console.log(`[GetSharedLists] ${response.status} ${response.statusText}`);
      if (response.status === 200) return response.data;
    } catch (err: any) {
      console.log(err);
    }
    return [];
  }
}

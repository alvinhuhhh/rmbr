import axios, { AxiosResponse } from "axios";
import appConfig from "../../config";

export default class SettingsService {
  public static async DeleteUser(email: string): Promise<AxiosResponse> {
    try {
      let response = await axios.delete(`${appConfig.api.url}/user/${email}`);
      console.log(`[DeleteUser] ${response.status} ${response.statusText}`);
      return response;
    } catch (err: any) {
      return err.response;
    }
  }
}

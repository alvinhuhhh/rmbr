import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import appConfig from "../../config";
import { IUser } from "../../types/user.types";

export default class LoginService {
  public static async CheckIfUserExists(email: string): Promise<AxiosResponse> {
    let response = axios.get(`${appConfig.api.url}/user/${email}`);
    return response;
  }

  public static async CreateUser(email: string): Promise<AxiosResponse | undefined> {
    let user: IUser = {
      email: email,
      createdDate: new Date(dayjs().format()),
      lists: [],
    };
    try {
      let response = await axios.post(`${appConfig.api.url}/user`, user);
      console.log(`[CreateUser] ${response.status} ${response.statusText}`);
      return response;
    } catch (err) {
      console.log(err);
    }
    return;
  }
}

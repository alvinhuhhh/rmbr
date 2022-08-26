import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { JWTPayload } from "jose";
import appConfig from "../../config";
import { IUser } from "../../types/user.types";

export default class LoginService {
  public static async CheckIfUserExists(email: string): Promise<AxiosResponse> {
    let response = axios.get(`${appConfig.api.url}/user/${email}`);
    return response;
  }

  public static async CreateUser(jwt: JWTPayload): Promise<AxiosResponse | undefined> {
    const user: IUser = {
      fullName: jwt.name as string,
      givenName: jwt.given_name as string,
      familyName: jwt.family_name as string,
      profilePicUrl: jwt.picture as string,
      email: jwt.email as string,
      createdDate: new Date(dayjs().format()),
      lists: [],
      sharedLists: [],
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

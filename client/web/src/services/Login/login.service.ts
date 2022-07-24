import axios from "axios";
import dayjs from "dayjs";
import appConfig from "../../config";
import { IUser } from "../../types/user.types";

export default class LoginService {
  public static async CheckIfUserExists(email: string): Promise<void> {
    axios.get(`${appConfig.api.url}/user/${email}`).catch((err) => {
      this.CreateUser(email);
    });
  }

  private static async CreateUser(email: string): Promise<void> {
    let user: IUser = {
      email: email,
      createdDate: new Date(dayjs().format()),
      lists: [],
    };
    try {
      let response = await axios.post(`${appConfig.api.url}/user`, user);
      console.log(`[CreateUser] ${response.status} ${response.statusText}`);
    } catch (err) {
      console.log(err);
    }
  }
}

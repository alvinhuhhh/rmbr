import axios from "axios";
import dayjs from "dayjs";
import appConfig from "../../config";

export default class LoginService {
  public static async CheckIfUserExists(email: string) {
    axios.get(`${appConfig.api.url}/user/${email}`).catch((err) => {
      this.CreateUser(email);
    });
  }

  private static async CreateUser(email: string) {
    let user: IUser = {
      email: email,
      createdDate: new Date(dayjs().format()),
      updatedDate: null,
      lists: [],
    };
    axios
      .post(`${appConfig.api.url}/user/create`, user)
      .then((response) => console.log(`[CreateUser] ${response.status} ${response.statusText}`))
      .catch((err) => console.log(err));
  }
}

import User from "../models/user";

export default class UserService {
  public static async GetUserById(id: string) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

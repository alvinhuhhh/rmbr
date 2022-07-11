import User from "../models/user";

export default class UserService {
  public static async GetUserByEmail(email: string) {
    try {
      const query = User.where({ email: email });
      const user = await query.findOne();
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async CreateUser(email: string) {
    try {
      const user = new User();
      user.email = email;
      user.createdDate = new Date();
      user.lists = [];
      await user.save();
      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

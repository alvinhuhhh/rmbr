import User from "../models/user";
import { IUser } from "../types/user.types";

export default class UserService {
  public static async GetUserByEmail(email: string) {
    try {
      const query = User.where({ email: email });
      const user = await query.findOne();
      if (user) return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async CreateUser(user: IUser) {
    try {
      // Check if user exists
      const query = User.where({ email: user.email });
      const existingUser = await query.findOne();
      if (existingUser) return null;

      // Create new user
      const newUser = new User();
      newUser.email = user.email;
      newUser.createdDate = new Date();
      await newUser.save();

      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async UpdateUser(user: IUser) {
    try {
      // Get existing user
      const query = User.where({ email: user.email });
      const existingUser = await query.findOne();
      if (existingUser) {
        // Update user
        existingUser.email = user.email;
        existingUser.updatedDate = new Date();
        await existingUser.save();

        return true;
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

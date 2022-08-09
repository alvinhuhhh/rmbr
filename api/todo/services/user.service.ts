import User from "../models/user";
import { IUser } from "../types/user.types";

export default class UserService {
  public static async GetUserByEmail(email: string): Promise<IUser | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) return user;
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateUser(user: IUser): Promise<boolean> {
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) return false;

      // Create new user
      const newUser = new User();
      newUser.email = user.email;
      newUser.createdDate = new Date();
      await newUser.save();

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public static async UpdateUser(user: IUser): Promise<boolean> {
    try {
      // Get existing user
      const existingUser = await User.findById(user._id);
      if (existingUser) {
        // Update user
        existingUser.email = user.email;
        existingUser.updatedDate = new Date();
        await existingUser.save();

        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

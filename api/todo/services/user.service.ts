import User from "../models/user";
import { IUser } from "../types/user.types";
import { IServiceResponse } from "../types/service.types";

export default class UserService {
  public static async GetUserByEmail(email: string): Promise<IUser | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) return user;
    } catch (err: any) {
      console.log(err);
    }
  }

  public static async CreateUser(user: IUser): Promise<IServiceResponse> {
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) return { succeeded: false, message: "User already exists" };

      // Create new user
      const newUser = new User();
      newUser.fullName = user.fullName;
      newUser.givenName = user.givenName;
      newUser.familyName = user.familyName;
      newUser.profilePicUrl = user.profilePicUrl;
      newUser.email = user.email;
      newUser.createdDate = new Date();
      await newUser.save();

      return { succeeded: true, message: "" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async UpdateUser(user: IUser): Promise<IServiceResponse> {
    try {
      // Get existing user
      const existingUser = await User.findById(user._id);
      if (existingUser) {
        // Update user
        existingUser.email = user.email;
        existingUser.updatedDate = new Date();
        await existingUser.save();

        return { succeeded: true, message: "" };
      }
      return { succeeded: false, message: "User does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async DeleteUser(): Promise<IServiceResponse> {
    return { succeeded: true, message: "" };
  }
}

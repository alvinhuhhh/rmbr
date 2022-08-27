import User from "../models/user";
import { IList } from "../types/list.types";
import { IServiceResponse } from "../types/service.types";

export default class SharingService {
  public static async CreateShare(email: string, targetUserEmail: string, list: IList): Promise<IServiceResponse> {
    try {
      if (email === targetUserEmail) return { succeeded: false, validationMessage: "List cannot be shared with owner" };

      const user = await User.findOne({ email: email });
      const targetUser = await User.findOne({ email: targetUserEmail });
      if (user && targetUser) {
        const existingList = user.lists.id(list._id);
        if (existingList) {
          // Add target user email to list sharedUsers
          if (!existingList.sharedUsers.find((user) => user.email === targetUserEmail)) {
            existingList.updatedBy = email;
            existingList.updatedDate = new Date();
            existingList.sharedUsers.push({ email: targetUserEmail });
            await user.save();

            // Add list id to target user sharedLists
            targetUser.updatedDate = new Date();
            targetUser.sharedLists.push({ email: email, listId: list._id });
            await targetUser.save();

            return { succeeded: true, validationMessage: "" };
          }
          return { succeeded: false, validationMessage: "User has already been added to shared users" };
        }
        return { succeeded: false, validationMessage: "List does not exist" };
      }
      return { succeeded: false, validationMessage: "User does not exist. Send an invite?" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, validationMessage: err.toString() };
    }
  }
}

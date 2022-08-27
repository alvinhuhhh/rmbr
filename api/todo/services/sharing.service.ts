import User from "../models/user";
import { IList } from "../types/list.types";

export default class SharingService {
  public static async CreateShare(email: string, targetUserEmail: string, list: IList): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      const targetUser = await User.findOne({ email: targetUserEmail });
      if (user && targetUser) {
        const existingList = user.lists.id(list._id);
        if (existingList) {
          // Add target user email to list sharedUsers
          existingList.updatedBy = email;
          existingList.updatedDate = new Date();
          existingList.sharedUsers.push({ email: targetUserEmail });
          await user.save();

          // Add list id to target user sharedLists
          targetUser.updatedDate = new Date();
          targetUser.sharedLists.push({ email: email, listId: list._id });
          await targetUser.save();

          return true;
        }
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

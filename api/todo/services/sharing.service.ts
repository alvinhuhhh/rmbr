import User from "../models/user";
import { IList } from "../types/list.types";
import { IServiceResponse } from "../types/service.types";

export default class SharingService {
  public static async CreateShare(email: string, targetUserEmail: string, list: IList): Promise<IServiceResponse> {
    try {
      if (email === targetUserEmail) return { succeeded: false, message: "List cannot be shared with owner" };

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

            return { succeeded: true, message: "" };
          }
          return { succeeded: false, message: "User has already been added to shared users" };
        }
        return { succeeded: false, message: "List does not exist" };
      }
      return { succeeded: false, message: "User does not exist. Send an invite?" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async UpdateShare(): Promise<void> {}

  public static async GetSharedLists(email: string): Promise<Array<IList> | undefined> {
    try {
      let result: Array<IList> = [];

      const user = await User.findOne({ email: email });
      if (user) {
        user.sharedLists.forEach((ref) => {
          User.findOne({ email: ref.email }).then((u) => {
            const list = u?.lists.id(ref.listId);
            list && result.push(list);
          });
        });
      }

      return result;
    } catch (err: any) {
      console.log(err);
    }
  }
}

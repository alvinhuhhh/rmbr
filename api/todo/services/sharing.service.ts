import User from "../models/user";
import { IList } from "../types/list.types";
import { IServiceResponse } from "../types/service.types";

export default class SharingService {
  public static async CreateShare(email: string, targetUserEmail: string, list: IList): Promise<IServiceResponse> {
    try {
      if (list.createdBy === targetUserEmail) return { succeeded: false, message: "List cannot be shared with owner" };

      const owner = await User.findOne({ email: list.createdBy });
      const sharedUser = await User.findOne({ email: targetUserEmail });
      if (owner && sharedUser) {
        const existingList = owner.lists.id(list._id);
        if (existingList) {
          if (!existingList.sharedUsers.find((user) => user.email === targetUserEmail)) {
            // Add shared user email to list sharedUsers
            existingList.updatedBy = email;
            existingList.updatedDate = new Date();
            existingList.sharedUsers.push({ email: targetUserEmail });

            // Add list to shared user sharedLists
            sharedUser.updatedDate = new Date();
            sharedUser.sharedLists.push({ email: list.createdBy, listId: list._id });

            // Add list to owner sharedLists
            owner.updatedDate = new Date();
            owner.sharedLists.push({ email: list.createdBy, listId: list._id });

            await owner.save();
            await sharedUser.save();

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

  public static async RemoveShare(email: string, targetUserEmail: string, list: IList): Promise<IServiceResponse> {
    try {
      const owner = await User.findOne({ email: list.createdBy });
      const sharedUser = await User.findOne({ email: targetUserEmail });
      if (owner && sharedUser) {
        const existingList = owner.lists.id(list._id);
        if (existingList) {
          // Remove shared user email from list sharedUsers
          existingList.updatedBy = email;
          existingList.updatedDate = new Date();
          existingList.sharedUsers.find((user) => user.email === targetUserEmail)?.remove();

          // Remove list from owner sharedLists if sharedUsers is empty
          if (!existingList.sharedUsers.length) {
            owner.updatedDate = new Date();
            owner.sharedLists
              .filter((ref) => ref.email === list.createdBy)
              .find((ref) => ref.listId.toString() === list._id.toString())
              ?.remove();
          }

          // Remove list from shared user sharedLists
          sharedUser.updatedDate = new Date();
          sharedUser.sharedLists
            .filter((ref) => ref.email === list.createdBy)
            .find((ref) => ref.listId.toString() === list._id.toString())
            ?.remove();

          await owner.save();
          await sharedUser.save();

          return { succeeded: true, message: "" };
        }
        return { succeeded: false, message: "List does not exist" };
      }
      return { succeeded: false, message: "User does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async GetSharedLists(email: string): Promise<Array<IList> | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        let result: Array<IList> = [];

        for (let i = 0; i < user.sharedLists.length; i++) {
          const u = await User.findOne({ email: user.sharedLists[i].email });
          if (u) {
            const list = u.lists.id(user.sharedLists[i].listId);
            if (list && !list.deleted) result.push(list);
          }
        }

        return result;
      }
    } catch (err: any) {
      console.log(err);
    }
  }
}

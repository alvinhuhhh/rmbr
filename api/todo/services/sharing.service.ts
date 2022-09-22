import User from "../models/user";
import Sharing from "../models/sharing";
import { IList } from "../types/list.types";
import { ISharing } from "../types/sharing.types";
import { IServiceResponse } from "../types/service.types";

export default class SharingService {
  public static async GetShareById(sharingId: string): Promise<ISharing | null> {
    try {
      const sharing = await Sharing.findById(sharingId);
      if (sharing) return sharing;
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  }

  public static async CreateShare(share: ISharing): Promise<IServiceResponse> {
    try {
      const sharing = new Sharing(share);
      sharing.createdDate = new Date();
      await sharing.save();

      return { succeeded: true, message: "" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async UpdateShare(share: ISharing): Promise<IServiceResponse> {
    try {
      const existingShare = await Sharing.findById(share._id);
      if (existingShare) {
        existingShare.updatedDate = new Date();
        existingShare.owner = share.owner;
        existingShare.users = share.users;
        existingShare.listId = share.listId;
        await existingShare.save();

        return { succeeded: true, message: "" };
      }
      return { succeeded: false, message: "Share does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async DeleteShare(sharingId: string): Promise<IServiceResponse> {
    try {
      const sharing = await Sharing.findById(sharingId);
      if (sharing) {
        await Sharing.findByIdAndDelete(sharingId);
        return { succeeded: true, message: "" };
      }
      return { succeeded: false, message: "Sharing does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async GetSharedLists(email: string): Promise<Array<IList> | null> {
    try {
      let lists: Array<IList> = [];

      // Get sharings with owner === email and users array not empty
      const own = await Sharing.find({ owner: email, users: { $not: { $size: 0 } } }, "owner listId");

      // Get sharings with email in Sharing.users
      const others = await Sharing.find({ "users.email": email }, "owner listId");

      // Combine own and others into shared
      const shared = own.concat(others);

      // Get shared lists from User
      for (let i = 0; i < shared.length; i++) {
        const user = await User.findOne({ email: shared[i].owner });
        if (user) {
          const list = user.lists.id(shared[i].listId);
          if (list && !list.deleted) lists.push(list);
        }
      }

      return lists;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  }
}

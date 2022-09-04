import Sharing from "../models/sharing";
import { ISharing } from "../types/sharing.types";
import { IList } from "../types/list.types";
import { IServiceResponse } from "../types/service.types";
import { ObjectId } from "mongodb";

export default class SharingService {
  public static async GetSharedLists(): Promise<undefined> {
    return;
  }

  public static async GetShareById(sharingId: string): Promise<ISharing | undefined> {
    try {
      const sharing = await Sharing.findById(sharingId);
      if (sharing) return sharing;
    } catch (err: any) {
      console.log(err);
    }
  }

  public static async CreateShare(share: ISharing): Promise<IServiceResponse> {
    try {
      const newShare = new Sharing({ ...share });
      newShare.createdDate = new Date();
      await newShare.save();

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
      Sharing.deleteOne({ _id: new ObjectId(sharingId) });
      return { succeeded: true, message: "" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }
}

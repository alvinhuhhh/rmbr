import Sharing from "../models/sharing";
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
}

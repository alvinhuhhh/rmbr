import { Request, Response } from "express";
import { ISharing } from "../types/sharing.types";
import SharingService from "../services/sharing.service";

export default class SharingController {
  public static async GetShareById(req: Request, res: Response): Promise<void> {
    try {
      const sharingId: string = req.params.sharingId;
      const sharing = await SharingService.GetShareById(sharingId);

      if (sharing) res.status(200).send(sharing);
      else res.status(404).send();
    } catch (err: any) {
      console.log(err);
    }
  }

  public static async CreateShare(req: Request, res: Response): Promise<void> {
    try {
      const share: ISharing = req.body;
      const response = await SharingService.CreateShare(share);

      if (response.succeeded) res.status(201).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send();
    }
  }

  public static async UpdateShare(req: Request, res: Response): Promise<void> {
    try {
      const share: ISharing = req.body;
      const response = await SharingService.UpdateShare(share);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send();
    }
  }

  public static async DeleteShare(req: Request, res: Response): Promise<void> {
    try {
      const sharingId: string = req.params.sharingId;
      const response = await SharingService.DeleteShare(sharingId);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
    }
  }

  public static async GetSharedLists(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const lists = await SharingService.GetSharedLists(email);

      if (lists) res.status(200).send(lists);
      else res.status(404).send();
    } catch (err: any) {
      console.log(err);
    }
  }
}

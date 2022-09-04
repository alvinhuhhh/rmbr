import { Request, Response } from "express";
import { ISharing } from "../types/sharing.types";
import SharingService from "../services/sharing.service";

export default class SharingController {
  public static async GetShareById(req: Request, res: Response): Promise<void> {
    const sharingId = req.params.sharingId;
    if (sharingId) {
      try {
        const sharing = await SharingService.GetShareById(sharingId);

        if (sharing) res.status(200).send(sharing);
        else res.status(404).send();
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }

  public static async CreateShare(req: Request, res: Response): Promise<void> {
    try {
      const share = req.body;
      const response = await SharingService.CreateShare(share as ISharing);

      if (response.succeeded) res.status(201).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send();
    }
  }

  public static async UpdateShare(req: Request, res: Response): Promise<void> {
    try {
      const share = req.body;
      const response = await SharingService.UpdateShare(share as ISharing);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send();
    }
  }

  public static async DeleteShare(req: Request, res: Response): Promise<void> {
    const sharingId = req.params.sharingId;
    if (sharingId) {
      try {
        const response = await SharingService.DeleteShare(sharingId);

        if (response.succeeded) res.status(204).send();
        else res.status(422).send(response.message);
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }
}

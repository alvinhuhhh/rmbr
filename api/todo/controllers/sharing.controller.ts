import { Request, Response } from "express";
import { IList } from "../types/list.types";
import SharingService from "../services/sharing.service";

export default class SharingController {
  public static async GetSharedLists(req: Request, res: Response): Promise<void> {}

  public static async CreateShare(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const list = req.body;
        const targetUserEmail = req.params.targetUserEmail;
        const response = await SharingService.CreateShare(email, targetUserEmail, list as IList);

        if (response.succeeded) res.status(201).send();
        else res.status(422).send(response.message);
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }

  public static async UpdateShare(req: Request, res: Response): Promise<void> {}
}

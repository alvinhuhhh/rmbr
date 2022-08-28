import { Request, Response } from "express";
import { IList } from "../types/list.types";
import SharingService from "../services/sharing.service";

export default class SharingController {
  public static async CreateShare(req: Request, res: Response): Promise<void> {
    const email = req.params.email;
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

  public static async RemoveShare(req: Request, res: Response): Promise<void> {
    const email = req.params.email;
    if (email) {
      try {
        const list = req.body;
        const targetUserEmail = req.params.targetUserEmail;
        const response = await SharingService.RemoveShare(email, targetUserEmail, list as IList);

        if (response.succeeded) res.status(204).send();
        else res.status(422).send(response.message);
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }

  public static async GetSharedLists(req: Request, res: Response): Promise<void> {
    const email = req.params.email;
    if (email) {
      try {
        const lists = await SharingService.GetSharedLists(email);

        if (lists) res.status(200).send(lists);
        else res.status(404).send();
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }
}

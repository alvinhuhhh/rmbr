import { Request, Response } from "express";
import TrashService from "../services/trash.service";

export default class TrashController {
  public static async GetTrash(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const trashed = await TrashService.GetTrash(email);

        if (trashed) res.status(200).send(trashed);
      } catch (err) {
        console.log(err);
      }
    } else res.status(500).send();
  }
}

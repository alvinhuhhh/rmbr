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

  public static async RestoreItem(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      const listId = req.params.listId;
      const response = await TrashService.RestoreItem(email, listId);

      if (response) res.status(204).send();
    } else res.status(500).send();
  }

  public static async DeleteItem(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const listId = req.params.listId;
        const response = await TrashService.DeleteItem(email, listId);

        if (response) res.status(204).send();
      } catch (err) {
        console.log(err);
      }
    } else res.status(500).send();
  }

  public static async DeleteAll(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const response = await TrashService.DeleteAll(email);

        if (response) res.status(204).send();
      } catch (err) {
        console.log(err);
      }
    } else res.status(500).send();
  }
}

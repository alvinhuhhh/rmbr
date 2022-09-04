import { Request, Response } from "express";
import TrashService from "../services/trash.service";

export default class TrashController {
  public static async GetTrash(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const trashed = await TrashService.GetTrash(email);

      if (trashed) res.status(200).send(trashed);
      else res.status(404).send();
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }

  public static async RestoreItem(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const listId: string = req.params.listId;
      const response = await TrashService.RestoreItem(email, listId);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send();
    }
  }

  public static async DeleteItem(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const listId: string = req.params.listId;
      const response = await TrashService.DeleteItem(email, listId);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send();
    }
  }

  public static async DeleteAll(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const response = await TrashService.DeleteAll(email);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }
}

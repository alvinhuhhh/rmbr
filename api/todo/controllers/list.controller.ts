import { Request, Response } from "express";
import { IList } from "../types/list.types";
import ListService from "../services/list.service";
import GetEmailFromHeaders from "../utils/GetEmailFromHeaders";

export default class ListController {
  public static async GetLists(req: Request, res: Response): Promise<void> {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    if (email) {
      try {
        const lists = await ListService.GetLists(email);

        if (lists) res.status(200).send(lists);
        else res.status(404).send();
      } catch (err) {
        console.log(err);
      }
    } else res.status(401).send();
  }

  public static async GetListById(req: Request, res: Response): Promise<void> {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    if (email) {
      try {
        const listId = req.params.listId;
        const list = await ListService.GetListById(email, listId);

        if (list) res.status(200).send(list);
        else res.status(404).send();
      } catch (err) {
        console.log(err);
      }
    } else res.status(401).send();
  }

  public static async CreateList(req: Request, res: Response): Promise<void> {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    if (email) {
      try {
        const list = req.body;
        const response = await ListService.CreateList(email, list as IList);

        if (response) res.status(201).send();
        else res.status(500).send();
      } catch (err) {
        console.log(err);
      }
    } else res.status(401).send();
  }

  public static async UpdateList(req: Request, res: Response): Promise<void> {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    if (email) {
      try {
        const list = req.body;
        const response = await ListService.UpdateList(email, list as IList);

        if (response) res.status(204).send();
        else res.status(500).send();
      } catch (err) {
        console.log(err);
      }
    } else res.status(401).send();
  }

  public static async DeleteList(req: Request, res: Response): Promise<void> {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    if (email) {
      try {
        const listId = req.params.listId;
        const response = await ListService.DeleteList(email, listId);

        if (response) res.status(204).send();
        else res.status(500).send();
      } catch (err) {
        console.log(err);
      }
    } else res.status(401).send();
  }
}

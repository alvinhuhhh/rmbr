import { Request, Response } from "express";
import { Types } from "mongoose";
import { IList } from "../types/list.types";
import ListService from "../services/list.service";
import SharingService from "../services/sharing.service";
import Sharing from "../models/sharing";

export default class ListController {
  public static async GetLists(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const lists = await ListService.GetLists(email);

      if (lists) res.status(200).send(lists);
      else res.status(404).send();
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }

  public static async GetListById(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const listId: string = req.params.listId;
      const list = await ListService.GetListById(email, listId);

      if (list) res.status(200).send(list);
      else res.status(404).send();
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }

  public static async CreateList(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const list: IList = req.body;
      const listId: Types.ObjectId = new Types.ObjectId();
      const sharingId: Types.ObjectId = new Types.ObjectId();

      // Create list
      list._id = listId;
      list.sharingId = sharingId;
      const createList = await ListService.CreateList(email, list);

      // Create sharing
      const sharing = new Sharing({
        _id: sharingId,
        createdDate: new Date(),
        owner: email,
        users: [],
        listId: listId,
      });
      const createSharing = await SharingService.CreateShare(sharing);

      if (createList.succeeded && createSharing.succeeded) {
        res.status(201).send();
      } else res.status(422).send();
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }

  public static async UpdateList(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const list: IList = req.body;
      const response = await ListService.UpdateList(email, list);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }

  public static async DeleteList(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email;
      const listId: string = req.params.listId;
      const response = await ListService.DeleteList(email, listId);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }
}

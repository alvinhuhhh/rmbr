import { Request, Response } from "express";
import ListService from "../services/list.service";

export default class ListController {
  public static async GetLists(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const lists = await ListService.GetLists(email);

      if (lists) res.status(200).send(lists);
      else res.status(404).send();
    } catch (err) {
      console.log(err);
    }
  }

  public static async GetListById(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const listId = req.params.listId;
      const list = await ListService.GetListById(email, listId);

      if (list) res.status(200).send(list);
      else res.status(404).send();
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateList(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const list = req.body;
      const response = await ListService.CreateList(email, list as IList);

      if (response) res.status(201).send();
      else res.status(500).send();
    } catch (err) {
      console.log(err);
    }
  }

  // public static async UpdateList(req: Request, res: Response) {
  //   try {
  //     const list = req.body;
  //     const response = await ListService.UpdateList(list as IList);

  //     if (response) res.status(204).send();
  //     else res.status(500).send();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // public static async DeleteList(req: Request, res: Response) {
  //   const id = req.params.id;
  //   const response = await ListService.DeleteList(id);

  //   if (response) res.status(204).send();
  //   else res.status(500).send();
  // }
}

import { Request, Response } from "express";
import { IUser } from "../types/user.types";
import UserService from "../services/user.service";

export default class UserController {
  public static async GetUserByEmail(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const user = await UserService.GetUserByEmail(email);

      if (user) res.status(200).send(user);
      else res.status(404).send();
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateUser(req: Request, res: Response) {
    try {
      const user = req.body;
      const response = await UserService.CreateUser(user as IUser);

      if (response) res.status(201).send();
      else res.status(500).send();
    } catch (err) {
      console.log(err);
    }
  }

  public static async UpdateUser(req: Request, res: Response) {
    try {
      const user = req.body;
      const response = await UserService.UpdateUser(user as IUser);

      if (response) res.status(204).send();
      else res.status(500).send();
    } catch (err) {
      console.log(err);
    }
  }
}

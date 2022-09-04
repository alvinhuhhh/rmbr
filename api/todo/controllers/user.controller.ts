import { Request, Response } from "express";
import { IUser } from "../types/user.types";
import UserService from "../services/user.service";

export default class UserController {
  public static async GetUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const user = await UserService.GetUserByEmail(email);

      if (user) res.status(200).send(user);
      else res.status(404).send();
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }

  public static async CreateUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      const response = await UserService.CreateUser(user);

      if (response.succeeded) res.status(201).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }

  public static async UpdateUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      const response = await UserService.UpdateUser(user);

      if (response.succeeded) res.status(204).send();
      else res.status(422).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }

  public static async DeleteUser(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const response = await UserService.DeleteUser(email);

      if (response.succeeded) res.status(204).send();
      else res.status(500).send(response.message);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.toString());
    }
  }
}

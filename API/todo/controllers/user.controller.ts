import { Request, Response } from "express";
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
      const body = req.body;
      if (typeof body.email === "string") {
        const user = await UserService.CreateUser(body.email);
        if (user) res.status(201).send();
        else res.status(500).send();
      }
    } catch (err) {
      console.log(err);
    }
  }

  public static async UpdateUser(req: Request, res: Response) {}
}

import { Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  public static async GetUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await UserService.GetUserById(id);

      if (user) res.status(200).send(user);
      else res.status(404).send();
    } catch (err) {
      console.log(err);
    }
  }
}

import { Request, Response } from "express";
import { ITodo } from "../types/todo.types";
import TodoService from "../services/todo.service";
import GetEmailFromHeaders from "../utils/GetEmailFromHeaders";

export default class TodoController {
  public static async GetTodos(req: Request, res: Response) {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    const listId = req.params.listId;
    try {
      const todos = await TodoService.GetTodos(email, listId);

      if (todos) res.status(200).send(todos);
      else res.status(404).send();
    } catch (err) {
      console.log(err);
    }
  }

  public static async GetTodoById(req: Request, res: Response) {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    try {
    } catch (err) {
      console.log(err);
    }
  }

  public static async UpdateTodo(req: Request, res: Response) {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    try {
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateTodo(req: Request, res: Response) {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    try {
    } catch (err) {
      console.log(err);
    }
  }

  public static async DeleteTodo(req: Request, res: Response) {
    const email = GetEmailFromHeaders(req.get("Authorization") as string);
    try {
    } catch (err) {
      console.log(err);
    }
  }
}

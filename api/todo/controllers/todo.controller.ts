import { Request, Response } from "express";
import { ITodo } from "../types/todo.types";
import TodoService from "../services/todo.service";

export default class TodoController {
  public static async GetTodos(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const listId = req.params.listId;
        const todos = await TodoService.GetTodos(email, listId);

        if (todos) res.status(200).send(todos);
        else res.status(404).send();
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }

  public static async GetTodoById(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const listId = req.params.listId;
        const todoId = req.params.todoId;
        const todo = await TodoService.GetTodoById(email, listId, todoId);

        if (todo) res.status(200).send(todo);
        else res.status(404).send();
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }

  public static async CreateTodo(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const todo = req.body;
        const listId = req.params.listId;
        const response = await TodoService.CreateTodo(email, listId, todo as ITodo);

        if (response.succeeded) res.status(201).send();
        else res.status(422).send(response.message);
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }

  public static async UpdateTodo(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const todo = req.body;
        const listId = req.params.listId;
        const response = await TodoService.UpdateTodo(email, listId, todo as ITodo);

        if (response.succeeded) res.status(204).send();
        else res.status(422).send(response.message);
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }

  public static async DeleteTodo(req: Request, res: Response): Promise<void> {
    const email = req.email;
    if (email) {
      try {
        const listId = req.params.listId;
        const todoId = req.params.todoId;
        const response = await TodoService.DeleteTodo(email, listId, todoId);

        if (response.succeeded) res.status(204).send();
        else res.status(422).send(response.message);
      } catch (err: any) {
        console.log(err);
      }
    } else res.status(500).send();
  }
}

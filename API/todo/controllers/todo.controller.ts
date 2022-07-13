import { Request, Response } from "express";
import { ITodo } from "../types/todo.types";
import TodoService from "../services/todo.service";
import GetEmailFromHeaders from "../utils/GetEmailFromHeaders";

export default class TodoController {
  public static async GetTodoById() {}

  public static async UpdateTodo() {}

  public static async CreateTodo() {}

  public static async DeleteTodo() {}
}

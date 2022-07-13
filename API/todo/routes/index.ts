import { Router } from "express";

import UserController from "../controllers/user.controller";
import ListController from "../controllers/list.controller";
import TodoController from "../controllers/todo.controller";

const router = Router();

router.get("/user/:email", UserController.GetUserByEmail);
router.post("/user/create", UserController.CreateUser);
router.put("/user/:email", UserController.UpdateUser);

router.get("/list/:email", ListController.GetLists);
router.get("/list/:email/:listId", ListController.GetListById);
router.post("/list/:email/create", ListController.CreateList);
router.put("/list/:email/:listId", ListController.UpdateList);
router.delete("/list/:email/:listId", ListController.DeleteList);

router.get("/todo/:todoId", TodoController.GetTodoById);
router.post("/todo/create", TodoController.CreateTodo);
router.put("/todo/:todoId", TodoController.UpdateTodo);
router.delete("/list/:todoId", TodoController.DeleteTodo);

export default router;

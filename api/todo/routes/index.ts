import { Router } from "express";

import UserController from "../controllers/user.controller";
import ListController from "../controllers/list.controller";
import TodoController from "../controllers/todo.controller";
import TrashController from "../controllers/trash.controller";
import SharingController from "../controllers/sharing.controller";

const router = Router();

router.get("/user/:email", UserController.GetUserByEmail);
router.post("/user", UserController.CreateUser);
router.put("/user/:email", UserController.UpdateUser);

router.get("/list/:email", ListController.GetLists);
router.get("/list/:email/:listId", ListController.GetListById);
router.post("/list/:email", ListController.CreateList);
router.put("/list/:email/:listId", ListController.UpdateList);
router.delete("/list/:email/:listId", ListController.DeleteList);

router.get("/todo/:email/:listId", TodoController.GetTodos);
router.get("/todo/:email/:listId/:todoId", TodoController.GetTodoById);
router.post("/todo/:email/:listId", TodoController.CreateTodo);
router.put("/todo/:email/:listId/:todoId", TodoController.UpdateTodo);
router.delete("/todo/:email/:listId/:todoId", TodoController.DeleteTodo);

router.get("/trash/:email", TrashController.GetTrash);
router.put("/trash/:email/:listId", TrashController.RestoreItem);
router.delete("/trash/:email/:listId", TrashController.DeleteItem);
router.delete("/trash/:email", TrashController.DeleteAll);

router.post("/sharing/:email/:targetUserEmail", SharingController.CreateShare);
router.put("/sharing/:email/:targetUserEmail", SharingController.RemoveShare);

router.get("/sharing/list/:email", SharingController.GetSharedLists);

export default router;

import { Router } from "express";

const router = Router();
const TodoController = require("../controllers/todo.controller");

// GET todos homepage
router.get("/todo/list", TodoController.getTodoList);

// GET todo by id
router.get("/todo/:id", TodoController.getTodoById);

// POST create todo
router.post("/todo/create", TodoController.createTodo);

// PUT update todo
router.put("/todo/:id/update", TodoController.updateTodo);

// DELETE delete todo
router.delete("/todo/:id/delete", TodoController.deleteTodo);

export default router;

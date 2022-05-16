import express from "express";

const router = express.Router();

// Require controller modules
var todoController = require("../controllers/todoController");

/**
 * Todo Routes
 */
// GET todos homepage
router.get("/todo/list", todoController.get_todo_list);

// GET todo by id
router.get("/todo/:id", todoController.get_todo);

// POST create todo
router.post("/todo/create", todoController.create_todo);

// PUT update todo
router.put("/todo/:id/update", todoController.update_todo);

// DELETE delete todo
router.delete("/todo/:id/delete", todoController.delete_todo);

export default router;

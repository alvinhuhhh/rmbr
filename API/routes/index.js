const express = require("express");
const router = express.Router();

// Require controller modules
var todo_controller = require("../controllers/todoController");

/**
 * Todo Routes
 */
// GET todos homepage
router.get("/todo/list", todo_controller.get_todo_list);

// GET todo by id
router.get("/todo/:id", todo_controller.get_todo);

// POST create todo
router.post("/todo/create", todo_controller.create_todo);

// PUT update todo
router.put("/todo/:id/update", todo_controller.update_todo);

// DELETE delete todo
router.delete("/todo/:id/delete", todo_controller.delete_todo);

module.exports = router;

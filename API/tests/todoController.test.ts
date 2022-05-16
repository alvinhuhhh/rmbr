var todoController = require("../controllers/todoController");

test("get_todo_list", async () => {
  const data = todoController.get_todo_list();
  expect(data).toBe(true);
});

const express = require("express");

const todosController = require("../controller/todos.controller");
const router = express.Router();

router.get("/", todosController.getAllTodos);
router.post("/", todosController.addTodo);

router.patch("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);
module.exports = router;

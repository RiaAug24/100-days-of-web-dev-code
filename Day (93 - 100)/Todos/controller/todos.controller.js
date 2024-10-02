const Todo = require("../model/todo.model");

let getAllTodos = async (req, res, next) => {
  let todos;
  try {
    todos = await Todo.getAlltodos();
  } catch (error) {
    return next(error);
  }

  res.json({
    todos: todos,
  });
};

let addTodo = async (req, res, next) => {
  const todoText = req.body.text;
  const todo = new Todo(todoText);
  let insertedId;
  try {
    const result = await todo.save();
    insertedId = result.insertedId;
  } catch (error) {
    return next(error);
  }
  todo.id = insertedId.toString();

  res.json({ message: "Todo created succesfully!", createdTodo: todo });
};

let updateTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const newTodoText = req.body.newText;
  const todo = new Todo(newTodoText, todoId);

  try {
    await todo.save();
  } catch (error) {
    return next(error);
  }
  res.json({ message: "Todo updated succesfully!", updateTodo: todo });
};

let deleteTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const todo = new Todo(null, todoId);

  try {
    await todo.delete();
  } catch (error) {
    return next(error);
  }
  res.json({ message: "Todo deleted succesfully!" });
};

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};

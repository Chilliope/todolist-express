const { Todolist } = require('../models')

exports.getAllTodolists = async (req, res) => {
    const todolists = await Todolist.findAll()
    res.json(todolists)
}

exports.createTodolist = async (req, res) => {
  const { todolist } = req.body;
  const newTodolist = await Todolist.create({ todolist });
  res.json(newTodolist);
};
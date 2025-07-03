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

exports.updateTodolist = async (req, res) => {
  const { id } = req.params;
  const { todolist } = req.body;

  try {
    const todo = await Todolist.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todolist not found' });
    }

    todo.todolist = todolist;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todolist', error });
  }
};

exports.updateTodolistStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todolist.findByPk(id);

    if(todo.status === 'unchecked') {
        todo.status = 'checked'
    } else {
        todo.status = 'unchecked'
    }

    if (!todo) {
      return res.status(404).json({ message: 'Todolist not found' });
    }

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todolist', error });
  }
}
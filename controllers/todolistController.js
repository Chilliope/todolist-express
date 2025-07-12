const Todolist = require('../models/todolist');

exports.getAllTodolists = async (req, res) => {
  try {
    const todos = await Todolist.findAll({
      where: { userId: req.user.id },
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil todolist' });
  }
};

exports.createTodolist = async (req, res) => {
  try {
    const todo = await Todolist.create({
      todolist: req.body.todolist,
      status: 'unchecked',
      userId: req.user.id,
    });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan todolist' });
  }
};

// Pastikan update dan delete juga hanya untuk milik user yg login:
exports.updateTodolist = async (req, res) => {
  try {
    const todo = await Todolist.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!todo) return res.status(404).json({ message: 'Todo tidak ditemukan' });

    todo.todolist = req.body.todolist;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate todo' });
  }
};

exports.updateTodolistStatus = async (req, res) => {
  try {
    const todo = await Todolist.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!todo) return res.status(404).json({ message: 'Todo tidak ditemukan' });

    todo.status = req.body.status;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengubah status' });
  }
};

exports.deleteTodolist = async (req, res) => {
  try {
    const deleted = await Todolist.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!deleted) return res.status(404).json({ message: 'Todo tidak ditemukan' });

    res.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus todo' });
  }
};

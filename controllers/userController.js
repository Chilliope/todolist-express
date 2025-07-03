const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { fullname, username, password } = req.body;
  const newUser = await User.create({ fullname, username, password });
  res.json(newUser);
};

const sequelize = require('../config/database');
const Todolist = require('./todolist');
const User = require('./user');

const db = {
  sequelize,
  Todolist,
  User
};

module.exports = db;

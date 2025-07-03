const sequelize = require('../config/database');
const User = require('./user');
const Todolist = require('./todolist');

const db = {
  sequelize,
  User,
  Todolist
};

module.exports = db;

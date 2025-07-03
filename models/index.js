const sequelize = require('../config/database');
const Todolist = require('./todolist');

const db = {
  sequelize,
  Todolist
};

module.exports = db;

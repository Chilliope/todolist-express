const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todolist = sequelize.define('Todolist', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  todolist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('unchecked', 'checked'),
    defaultValue: 'unchecked'
  }
}, {
  tableName: 'todolists'
});

module.exports = Todolist;

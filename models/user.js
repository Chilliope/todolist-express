const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {

  });

  return User;
};


const User = sequelize.define('User', {
    googleId: {
      type: DataTypes.STRING,
      unique: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    photo: DataTypes.STRING
}, {
    tableName: 'users'
});

module.exports = User
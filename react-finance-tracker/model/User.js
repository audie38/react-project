const Sequelize = require("sequelize");
const conn = require("../config/db");

const Users = conn.define("users", {
  userId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  photos: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Users;

import Sequelize from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcryptjs";

const User = sequelize.define("user", {
  userId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default User;

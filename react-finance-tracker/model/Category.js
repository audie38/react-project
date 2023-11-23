const Sequelize = require("sequelize");
const conn = require("../config/db");

const Users = require("./User");

const Categories = conn.define("categories", {
  categoryId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  categoryType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.BIGINT,
    allowNull: true,
    refrences: {
      model: Users,
      key: "userId",
    },
  },
});

module.exports = Categories;

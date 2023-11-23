const Sequelize = require("sequelize");
const conn = require("../config/db");

const Users = require("./User");

const Wallets = conn.define("wallets", {
  walletId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  walletName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  currencyCode: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "IDR",
  },
});

Wallets.belongsTo(Users, { constraint: true, onDelete: "CASCADE", foreignKey: "userId", targetKey: "userId" });
Users.hasMany(Wallets, { foreignKey: "userId", sourceKey: "userId" });

module.exports = Wallets;

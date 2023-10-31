const Sequelize = require("sequelize");
const conn = require("../config/db");

const Currencies = conn.define("currencies", {
  currencyId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  currencyCode: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "IDR",
  },
  currencyRate: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = Currencies;

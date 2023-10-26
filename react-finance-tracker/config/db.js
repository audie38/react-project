const Sequelize = require("sequelize");

const dbHost = process.env.DB_HOST || "";
const dbName = process.env.DB_NAME || "";
const dbUsername = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbDialect = process.env.DB_DIALECT || "";

const conn = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: dbDialect,
  host: dbHost,
});

module.exports = conn;

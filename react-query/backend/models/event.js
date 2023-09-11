const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Events = sequelize.define("events", {
  eventsId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  eventDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  eventTime: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  eventLocation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eventImage: {
    type: Sequelize.STRING,
  },
});

module.exports = Events;

const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Users = require("./user");

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

Events.belongsTo(Users, { constraint: true, onDelete: "CASCADE", foreignKey: "userId", targetKey: "userId" });
Users.hasMany(Events, { foreignKey: "userId", sourceKey: "userId" });

module.exports = Events;

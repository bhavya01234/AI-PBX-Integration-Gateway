const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./calls.db",
  logging: false,
});

module.exports = sequelize;

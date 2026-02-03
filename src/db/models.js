const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Call = sequelize.define("Call", {
  callerId: {
    type: DataTypes.STRING,
  },
  destination: {
    type: DataTypes.STRING,
  },
  startTime: {
    type: DataTypes.DATE,
  },
  endTime: {
    type: DataTypes.DATE,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  transcription: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "IN_PROGRESS",
  },
});

module.exports = { Call, sequelize };

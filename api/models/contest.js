const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Contest = sequelize.define(
  "contest",
  {
    contestID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    contestName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contestPassword: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    contestDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["contestPassword"] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

module.exports = Contest;

const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Submission = sequelize.define("submission", {
  submissionID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  solution: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  problemId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  contestId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  verdict: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  problemTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Submission;

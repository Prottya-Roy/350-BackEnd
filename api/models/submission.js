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
    allowNull: false,
  },
  verdict: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Submission;

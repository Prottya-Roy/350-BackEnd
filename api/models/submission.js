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
  language: {
    type: Sequelize.STRING,
    enum: ["c++"],
  },
  submissionTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  verdict: {
    type: Sequelize.STRING,
    enum: [
      "Accepted",
      "Wrong Answer",
      "Compilation Error",
      "TLE",
      "MLE",
      "Runtime Error",
      "Presentation Error",
    ],
  },
});

module.exports = Submission;

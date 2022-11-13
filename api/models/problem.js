const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Problem = sequelize.define("problem", {
  problemID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true, 
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  statement: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  inputDescription: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  outputDescription: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  difficulty: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  timeLimit: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  memoryLimit: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
});

module.exports = Problem;

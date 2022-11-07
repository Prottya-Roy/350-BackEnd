const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Problem = sequelize.define("problem", {
  problemID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Problem;

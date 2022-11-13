const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Problem = sequelize.define("problemOfContest", {
  problemID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  contestID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});
module.exports = Problem;

const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Problem = sequelize.define("problemOfContest", {
  problemID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  contestID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  alias: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
});
module.exports = Problem;

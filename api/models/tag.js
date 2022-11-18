const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Tag = sequelize.define("tag", {
  tag: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  problemId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Tag;

const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Tag = sequelize.define("tag", {
  problemID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Tag;

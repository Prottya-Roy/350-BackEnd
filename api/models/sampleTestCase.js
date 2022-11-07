const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const SampleTestCase = sequelize.define("sampleTestCase", {
  caseNo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  input: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  output: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = SampleTestCase;

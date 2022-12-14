const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const SampleTestCase = sequelize.define("sampleTestCase", {
  problemId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  caseNo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  input: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  output: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  }
});

module.exports = SampleTestCase;

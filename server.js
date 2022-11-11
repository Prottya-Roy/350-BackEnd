const http = require("http");
const app = require("./app");
const sequelize = require("./api/database/database");

const User = require("./api/models/user");
const Problem = require("./api/models/problem");
const Contest = require("./api/models/contest");
const Submission = require("./api/models/submission");
const SampleTestCase = require("./api/models/sampleTestCase");
const MainTestCase = require("./api/models/mainTestCase");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

User.hasMany(Submission);
User.hasMany(Problem);
Problem.hasMany(Submission);
Contest.hasMany(Problem);
User.hasMany(Contest);
Problem.hasMany(SampleTestCase);
Problem.hasMany(MainTestCase);

const startServer = async (server) => {
  await sequelize.authenticate();
  await sequelize.sync({ 
    // force: true
   }).then((result) => {
    console.log(result);
  });
  server.listen(port, () => {
    console.log("Server Started...");
  });
};

startServer(server);

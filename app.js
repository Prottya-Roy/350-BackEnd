const express = require("express");
const app = express();

const problemRoutes = require("./api/routes/problems");
const userRoutes = require("./api/routes/user");

app.use("/problems", problemRoutes);
app.use("/user", userRoutes);

module.exports = app;

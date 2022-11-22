const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");

const problemRoutes = require("./api/routes/problems");
const userRoutes = require("./api/routes/user");
const contestRoutes = require("./api/routes/contest");
const submissionRoutes = require("./api/routes/submission");
const errorHandler = require("./api/middlewares/errorhandler");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    next(err);
  });
};

app.use("/problem", catchAsync(problemRoutes));
app.use("/user", catchAsync(userRoutes));
app.use("/contest", catchAsync(contestRoutes));
app.use("/submission", catchAsync(submissionRoutes));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "user get request",
  });
});

router.get("/byID/:userID", (req, res, next) => {
  res.status(200).json({
    message: "one user get request",
  });
});

router.post("/register", (req, res, next) => {
  res.status(200).json({
    message: "user register request",
  });
});

router.post("/login", (req, res, next) => {
  res.status(200).json({
    message: "user login request",
  });
});

router.patch("/", (req, res, next) => {
  res.status(200).json({
    message: "user update request",
  });
});
router.delete("/:userID", (req, res, next) => {
  res.status(200).json({
    message: "user delete request",
  });
});

module.exports = router;

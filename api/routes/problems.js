const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "problems get request",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "problems post request",
  });
});
router.get("/:problemID", (req, res, next) => {
  res.status(200).json({
    message: "one problem get request",
  });
});
router.delete("/:problemID", (req, res, next) => {
  res.status(200).json({
    message: "problems delete request",
  });
});

module.exports = router;

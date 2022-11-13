const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/auth_jwt");
const problemController = require("../controllers/problem");


router.get("/", problemController.getAllProblem);

router.post("/", checkAuth, problemController.newProblem);

router.post("/tags", checkAuth, problemController.addTags);

router.post("/sampleCase", checkAuth, problemController.addsampleCase);

router.post("/mainInput", checkAuth, problemController.addmainInput);

router.post("/mainOutput", checkAuth, problemController.addmainOutput);

router.post("/mainCase", checkAuth, problemController.addmainCase);


// router.post("/", (req, res, next) => {
//   res.status(200).json({
//     message: "problems post request",
//   });
// });
// router.get("/:problemID", (req, res, next) => {
//   res.status(200).json({
//     message: "one problem get request",
//   });
// });
// router.delete("/:problemID", (req, res, next) => {
//   res.status(200).json({
//     message: "problems delete request",
//   });
// });

module.exports = router;

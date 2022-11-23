const express = require("express");
const router = express.Router();
const contestController = require("../controllers/contest");
const checkAuth = require("../middlewares/auth_jwt");
const checkAuthContest = require("../middlewares/auth_contest");

router.get("/", contestController.getAllContests);
router.get("/byId/:contestID", contestController.getContestById);
router.post("/", checkAuth, contestController.createNewContest);
router.get("/showStanding", contestController.showStandings);
router.post("/joinContest", checkAuth, checkAuthContest, contestController.joinContest);
router.post("/showProblems/:contestID", checkAuth, checkAuthContest, contestController.getContestProblems);

module.exports = router;

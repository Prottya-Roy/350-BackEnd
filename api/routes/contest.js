const express = require("express");
const router = express.Router();
const contestController = require("../controllers/contest");
const checkAuth = require("../middlewares/auth_jwt");

router.get("/", contestController.getAllContests);
router.get("/byId/:contestID", contestController.getContestById);
router.post("/", checkAuth, contestController.createNewContest);
router.get("/showStanding", contestController.showStandings);
router.post("/joinContest", contestController.joinContest);
router.post("/addProblems", contestController.addProblemsToContest);
router.get("/showProblems", contestController.getContestProblems);

module.exports = router;

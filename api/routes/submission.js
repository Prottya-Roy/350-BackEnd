const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submission");
const checkAuth = require("../middlewares/auth_jwt");
const checkAuthContest = require("../middlewares/auth_contest");

router.get("/", submissionController.getAllSubmission);
router.get("/byId/:submissionID", submissionController.getSubmissionById);
router.get("/byUser/:userId", submissionController.getSubmissionbByUser);
router.get(
  "/byProblem/:problemId", 
  submissionController.getSubmissionByProblem
);
router.post(
  "/byContest/:contestID", checkAuth, checkAuthContest,
  submissionController.getSubmissionByContest
);
router.post("/", checkAuth, submissionController.newSubmission);

module.exports = router;

const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submission");
const checkAuth = require("../middlewares/auth_jwt");

router.get("/", submissionController.getAllSubmission);
router.get("/byId/:submissionID", submissionController.getSubmissionById);
router.get("/byUser/:userId", submissionController.getSubmissionbByUser);
router.get(
  "/byProblem/:problemId",
  submissionController.getSubmissionByProblem
);
router.get(
  "/byContest/:contestId",
  submissionController.getSubmissionByContest
);
router.post("/", checkAuth, submissionController.newSubmission);

module.exports = router;

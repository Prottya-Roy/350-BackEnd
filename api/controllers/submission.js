const Submission = require("../models/submission");
const sequelize = require("../database/database");

exports.getAllSubmission = async (req, res) => {
  try {
    const submissions = await Submission.findAll();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.submissionID);
    if (submission) {
      res.status(200).json(submission);
    } else {
      res.status(404).json("Submission not found");
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getSubmissionbByUser = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getSubmissionByProblem = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { problemId: req.params.problemId },
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getSubmissionByContest = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { contestId: req.params.contestId },
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.newSubmission = async (req, res) => {
  try {
    const submission = await Submission.create({
      solution: req.body.solution,
      userId: req.userID,
      problemId: req.body.problemId,
      contestId: req.body.contestId,
      verdict: req.body.verdict,
    });
    res.status(201).json({ submissionID: submission.submissionID });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

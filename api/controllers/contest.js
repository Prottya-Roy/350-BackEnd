const Contest = require("../models/contest");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getAllContests = async (req, res) => {
  try {
    const contests = await Contest.findAll();
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.createNewContest = async (req, res) => {
  try {
    if (invalidPassword(req.body.contestPassword)) {
      res.status(400).json({ msg: "Invalid input" });
    } else {
      const hash = await bcrypt.hash(req.body.contestPassword, saltRounds);
      const contest = await Contest.create({
        contestName: req.body.contestName,
        contestDescription: req.body.contestDescription,
        contestPassword: hash,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userUserID: req.userID,
      });
      res.status(201).json({ contestID: contest.contestID });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getContestById = async (req, res) => {
  try {
    const contest = await Contest.findByPk(req.params.contestID);
    if (contest) {
      res.status(200).json(contest);
    } else {
      res.status(500).json({ msg: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.showStandings = async (req, res) => {
  res.status(200).json({ msg: "inside show standings controller." });
};

exports.joinContest = async (req, res) => {
  res.status(200).json({ msg: "join contest request." });
};

exports.getContestProblems = async (req, res) => {
  res.status(200).json({ msg: "get Contest Problem request" });
};
exports.addProblemsToContest = async (req, res) => {
  res.status(200).json({ msg: "add problems to contest request." });
};

const invalidPassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
  return !re.test(password);
};

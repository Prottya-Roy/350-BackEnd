const { request } = require("express");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let contestToken = req.body.contestAuthorization;
  try {
    console.log("token: ", contestToken);
    const decodedContest = jwt.verify(contestToken, process.env.JWT_KEY);
    console.log("ASD");
    const contestId = decodedContest.contestId;
    const contestUserId = decodedContest.contestUserId;
    console.log("ppppppppp", contestId, req.body.contestId , contestUserId , req.userID);
    if(contestId == req.body.contestId && contestUserId == req.userID) {
        req.contestId = contestId;
    }
  } catch (error) {
    console.log("dddddddddddddddddddddd error");
    // console.log(error);
    // next();
  }
  next();
};

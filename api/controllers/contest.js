const Contest = require("../models/contest");
const ProblemOfContest = require("../models/problemOfContest");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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
		console.log("Pass: ", req.body.contestPassword);
      const hash = await bcrypt.hash(req.body.contestPassword, saltRounds);
      const contest = await Contest.create({
        contestName: req.body.contestName,
        contestDescription: req.body.contestDescription,
        contestPassword: hash,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userUserID: req.userID,
      });
      
      await req.body.problemList.map((element, index) => {
        if(index < req.body.problemList.length - 1){
            ProblemOfContest.create({
                contestID:contest.contestID,
                problemID:element.id,
                index,
				alias:element.alias
            }, /*{transaction:t}*/)
        }
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
	if(req.contestId) {
    console.log("Logged in already");
    res.status(200).json({conest:req.contestId, status:"old"});
  }
	else {
    console.log("Logginh in now");
		try{
			const contest = await Contest.scope("withPassword").findByPk(req.body.contestId);
			if(contest){
				console.log("PAssHash: ", contest.contestPassword);
				const result = await bcrypt.compare(req.body.password, contest.contestPassword);
				if (result) {
					const contestToken = jwt.sign(
						{
							contestId: req.body.contestId,
							contestUserId: req.userID
						},
							process.env.JWT_KEY,
						{
							expiresIn: "5h",
						}
					);
					console.log(contestToken);
					res.status(200).json({
						message: "contest join successfull...",
						contestToken: contestToken,
            			status:"new"
					});
				}else{
					res.status(500).json({ msg: "Internal server error" });

				}
			} else{
				res.status(500).json({ msg: "Internal server error" });

			}
		} catch (error) {
			// console.log("=============+>");
			res.status(500).json({ msg: "Internal server error" });
		}
	}
};

exports.getContestProblems = async (req, res) => {
	// console.log("========++>", "Getting problems", req.contestId);
	if(req.contestId == req.params.contestID){
		try {
				const problems = await ProblemOfContest.findAll({where:{contestID:req.params.contestID}});
				res.status(200).json(problems);
				// console.log("Problems", problems);
			} catch (error) {
				res.status(500).json({ msg: "Internal server error" });
		}
	} else 	res.status(401).json({ msg: "UNAUTHORIZED" });

};


const invalidPassword = (password) => {
  return false;
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
  return !re.test(password);
};

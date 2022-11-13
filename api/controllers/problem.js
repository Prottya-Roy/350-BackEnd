const Problem = require("../models/problem");
const Tag = require("../models/tag")
const Sample = require("../models/sampleTestCase")
const Test = require("../models/mainTestCase")
const fs = require('fs')

exports.getAllProblem = async (req, res) => {
    try {
        const problems = await Problem.findAll({attributes:['problemID', 'name']});
        console.log(problems);
        res.status(200).json(problems);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
};

exports.newProblem = async (req, res) => {
    try {
        const problem = await Problem.create({
            title: req.body.title,
            timeLimit: req.body.timeLimit,
            memoryLimit: req.body.memoryLimit,
            statement: req.body.statement,
            inputDescription: req.body.inputDescription,
            outputDescription: req.body.outputDescription,
            difficulty: req.body.diff,
        });
        res.status(201).json({id: problem.problemID});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};


exports.addTags = async (req, res) => {
    try {
        req.body.tagList.forEach(element => {
            Tag.create({
                problemID:req.body.pid,
                tag:element.tag
            })
        });
        res.status(201).json({msg:"Added Tags"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};

exports.addsampleCase = async (req, res) => {
    try {
        Sample.create({
            caseNo: req.body.index,
            problemProblemID:req.body.pid,
            input:req.body.input,
            output:req.body.output
        })
        res.status(201).json({msg:"added sample case: "+req.body.index});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};


exports.addmainInput = async (req, res) => {
    try {
        fs.mkdir("../350-storage/"+req.body.pid, (err) => {
            if (err) {
                console.log(err);
            }
        });
        fs.mkdir("../350-storage/"+req.body.pid+"/"+req.body.index, (err) => {
            if (err) {
                console.log(err);
            }
        });
        fs.writeFile("../350-storage/"+req.body.pid+"/"+req.body.index+"/input.txt", req.body.data, 'base64', err => {
            if (err) {
                console.log(err);
                throw err;
            }
        });

        res.status(201).json({msg:"Saved main input: "});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};


exports.addmainOutput = async (req, res) => {
    try {
        fs.writeFile("../350-storage/"+req.body.pid+"/"+req.body.index+"/output.txt", req.body.data, 'base64', err => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        
        res.status(201).json({msg:"Saved main output: "});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};


exports.addmainCase = async (req, res) => {
    try {
        console.log("======++>");
        Test.create({
            caseNo: req.body.index,
            problemProblemID:req.body.pid,
            input:req.body.input,
            output:req.body.output
        })
        res.status(201).json({msg:"added main case: "+req.body.index});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};
const Problem = require("../models/problem");
const Tag = require("../models/tag")
const Sample = require("../models/sampleTestCase")
const sequelize = require("../database/database");

exports.getAllProblem = async (req, res) => {
    try {
        const problems = await Problem.findAll({attributes:['problemID', 'title']});
        console.log(problems);
        res.status(200).json(problems);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
};

exports.getSingleProblem = async (req, res) => {
    try {
        const problem = await Problem.findByPk(req.params.id);
        problem? res.status(200).json(problem): res.status(404).json({msg:"Problem not found"});
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
};

exports.getTag = async (req, res) => {
    try {
        const tag = await Tag.findAll({ where: {problemId: req.params.id} });
        res.status(200).json(tag);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
};

exports.getSample = async (req, res) => {
    try {
        const sample = await Sample.findAll({ where: {problemId: req.params.id} });
        res.status(200).json(sample);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
};

exports.newProblem = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const problem = await Problem.create({
            title: req.body.title,
            timeLimit: req.body.timeLimit,
            memoryLimit: req.body.memoryLimit,
            statement: req.body.statement,
            inputDescription: req.body.inputDescription,
            outputDescription: req.body.outputDescription,
            difficulty: req.body.diff,
            author: req.username
        }, {transaction:t});
        
        await req.body.tagList.map((element, index) => {
            if(index < req.body.tagList.length - 1){
                Tag.create({
                    problemId:problem.problemID,
                    tag:element.tag
                }, /*{transaction:t}*/)
            }
        });

        await req.body.sampleTestList.map((test, index) => {
            if(index < req.body.sampleTestList.length - 1){
                let input = test.input;
                let output = test.output;
                console.log(input);
                console.log(output);
                
                input.replace('\n', '</p><p>');
                output.replace('\n', '</p><p>');
                Sample.create({
                    problemId:problem.problemID,
                    input,
                    output,
                    caseNo:index
                }, /*{transaction:t}*/)
            }
        });
        
        await t.commit();
        res.status(201).json({id: problem.problemID});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};

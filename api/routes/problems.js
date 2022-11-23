const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/auth_jwt");
const problemController = require("../controllers/problem");


router.get("/", problemController.getAllProblem);

router.post("/", checkAuth, problemController.newProblem);

router.get("/byId/:id", problemController.getSingleProblem);

router.get("/byUser/:id", problemController.getProblemFromUser);

router.get("/getTag/:id", problemController.getTag);

router.get("/getSample/:id", problemController.getSample);




module.exports = router;

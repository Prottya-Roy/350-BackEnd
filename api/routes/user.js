const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkAuth = require("../middlewares/auth_jwt");

router.get("/", userController.getAllUsers);

router.get("/byID/:userID", userController.getUserById);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.patch("/", checkAuth, userController.updateUser);

module.exports = router;

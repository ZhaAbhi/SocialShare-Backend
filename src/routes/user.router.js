const express = require("express");
const { httpSaveUser } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", httpSaveUser);

module.exports = userRouter;

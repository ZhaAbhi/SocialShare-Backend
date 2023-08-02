const express = require("express");
const { httpRegisterUser } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", httpRegisterUser);

module.exports = userRouter;

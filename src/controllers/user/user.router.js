const express = require("express");
const { httpRegister } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", httpRegister);

module.exports = userRouter;

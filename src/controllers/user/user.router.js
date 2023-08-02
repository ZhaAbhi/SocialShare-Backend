const express = require("express");
const { httpRegisterUser, httpLoginUser } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", httpRegisterUser);
userRouter.post("/login", httpLoginUser);

module.exports = userRouter;

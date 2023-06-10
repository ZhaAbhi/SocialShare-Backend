const express = require("express");
const { httpRegister, httpLogin } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/user/register", httpRegister);
userRouter.post("/user/login", httpLogin);

module.exports = userRouter;

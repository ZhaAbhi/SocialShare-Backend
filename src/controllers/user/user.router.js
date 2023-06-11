const express = require("express");
const { httpRegister, httpLogin, httpHome } = require("./user.controller");
const { auth } = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/user/register", httpRegister);
userRouter.post("/user/login", httpLogin);
userRouter.get("/", auth, httpHome);

module.exports = userRouter;

const express = require("express");
const {
  httpRegisterUser,
  httpLoginUser,
  httpGetUser,
} = require("./user.controller");
const { auth } = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", httpRegisterUser);
userRouter.post("/login", httpLoginUser);
userRouter.get("/", auth, httpGetUser);

module.exports = userRouter;

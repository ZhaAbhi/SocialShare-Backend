const express = require("express");
const {
  httpRegisterUser,
  httpLoginUser,
  dashboard,
} = require("./user.controller");
const { auth } = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", httpRegisterUser);
userRouter.post("/login", httpLoginUser);
userRouter.get("/", auth, dashboard);

module.exports = userRouter;

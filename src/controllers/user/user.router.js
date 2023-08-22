const express = require("express");
const {
  httpRegister,
  httpLogin,
  httpHome,
  httpFollowUser,
} = require("./user.controller");
const { auth } = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", httpRegister);
userRouter.post("/login", httpLogin);
userRouter.get("/", auth, httpHome);
userRouter.put("/follow/:followId", auth, httpFollowUser);

module.exports = userRouter;

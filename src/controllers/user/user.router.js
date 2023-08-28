const express = require("express");
const {
  httpRegister,
  httpLogin,
  httpHome,
  httpFollowUser,
  httpGetAllUser,
} = require("./user.controller");
const { auth } = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", httpRegister);
userRouter.post("/login", httpLogin);
userRouter.get("/", auth, httpHome);
userRouter.get("/users", auth, httpGetAllUser);
userRouter.put("/follow/:followId", auth, httpFollowUser);

module.exports = userRouter;

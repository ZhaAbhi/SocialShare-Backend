const express = require("express");
const {
  httpRegister,
  httpLogin,
  httpHome,
  httpFollowUser,
  httpGetAllUser,
  httpGetUserById,
  httpGetUserPost,
} = require("./user.controller");
const { auth } = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", httpRegister);
userRouter.post("/login", httpLogin);
userRouter.get("/", auth, httpHome);
userRouter.get("/users", auth, httpGetAllUser);
userRouter.put("/follow/:followId", auth, httpFollowUser);
userRouter.get("/user/:userId", auth, httpGetUserById);
userRouter.get("/user/post/:userId", auth, httpGetUserPost);

module.exports = userRouter;

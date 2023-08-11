const express = require("express");
const { httpRegister, httpLogin, httpHome } = require("./user.controller");
const { auth } = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", httpRegister);
userRouter.post("/login", httpLogin);
userRouter.get("/", auth, httpHome);

module.exports = userRouter;

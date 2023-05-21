const express = require("express");
const { httpSaveUser } = require("../controllers/user.controller");

const userRouter = express.Router();

module.exports = userRouter;

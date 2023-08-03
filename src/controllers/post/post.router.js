const express = require("express");
const { httpCreatePost } = require("./post.controller");
const { auth } = require("../../middlewares/auth");

const postRouter = express.Router();

postRouter.post("/create/post", auth, httpCreatePost);

module.exports = postRouter;

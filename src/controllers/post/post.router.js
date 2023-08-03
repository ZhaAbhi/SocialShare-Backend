const express = require("express");
const { httpCreatePost, httpGetAllPost } = require("./post.controller");
const { auth } = require("../../middlewares/auth");

const postRouter = express.Router();

postRouter.post("/create/post", auth, httpCreatePost);
postRouter.get("/posts", auth, httpGetAllPost);

module.exports = postRouter;

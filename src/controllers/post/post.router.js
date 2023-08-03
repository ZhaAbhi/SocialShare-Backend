const express = require("express");
const {
  httpCreatePost,
  httpGetAllPost,
  httpGetPostById,
} = require("./post.controller");
const { auth } = require("../../middlewares/auth");

const postRouter = express.Router();

postRouter.post("/create/post", auth, httpCreatePost);
postRouter.get("/posts", auth, httpGetAllPost);
postRouter.get("/post/:postId", auth, httpGetPostById);

module.exports = postRouter;

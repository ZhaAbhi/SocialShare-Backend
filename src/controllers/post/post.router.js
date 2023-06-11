const express = require("express");
const { auth } = require("../../middlewares/auth");
const {
  httpCreatePost,
  httpGetAllPosts,
  httpGetPostById,
  httpGetPostByUserId,
} = require("./post.controller");

const postRouter = express.Router();

postRouter.post("/post/create", auth, httpCreatePost);
postRouter.get("/post/retrieve/all", auth, httpGetAllPosts);
postRouter.get("/post/retrieve/:postId", auth, httpGetPostById);
postRouter.get("/post/user/retrieve", auth, httpGetPostByUserId);

module.exports = postRouter;

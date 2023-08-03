const express = require("express");
const {
  httpCreatePost,
  httpGetAllPost,
  httpGetPostById,
  httpGetMyPost,
  httpRemovePost,
  httpAddComment,
  httpGetPostComments,
} = require("./post.controller");
const { auth } = require("../../middlewares/auth");

const postRouter = express.Router();

postRouter.post("/create/post", auth, httpCreatePost);
postRouter.get("/posts", auth, httpGetAllPost);
postRouter.get("/post/:postId", auth, httpGetPostById);
postRouter.get("/mypost", auth, httpGetMyPost);
postRouter.delete("/post/remove/:postId", auth, httpRemovePost);
postRouter.post("/post/comment/:postId", auth, httpAddComment);
postRouter.get("/post/comments/:postId", auth, httpGetPostComments);

module.exports = postRouter;

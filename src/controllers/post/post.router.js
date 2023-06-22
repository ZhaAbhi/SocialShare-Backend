const express = require("express");
const { auth } = require("../../middlewares/auth");
const {
  httpCreatePost,
  httpGetAllPosts,
  httpGetPostById,
  httpGetPostByUserId,
  httpDeletePost,
  httpLikePost,
  httpComment,
} = require("./post.controller");
const upload = require("../../middlewares/uploadImage");

const postRouter = express.Router();

postRouter.post(
  "/post/create",
  auth,
  upload.single("PostImage"),
  httpCreatePost
);
postRouter.get("/post/retrieve/all", auth, httpGetAllPosts);
postRouter.get("/post/retrieve/:postId", auth, httpGetPostById);
postRouter.get("/post/user/retrieve", auth, httpGetPostByUserId);
postRouter.delete("/post/delete/:postId", auth, httpDeletePost);
postRouter.put("/post/like/:postId", auth, httpLikePost);
postRouter.post("/post/comment/:postId", auth, httpComment);

module.exports = postRouter;

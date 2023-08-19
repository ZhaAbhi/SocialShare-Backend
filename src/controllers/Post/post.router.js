const express = require("express");
const {
  httpPostContent,
  httpGetAllPosts,
  httpGetPost,
  httpLikePost,
  httpComment,
} = require("./post.controller");
const multer = require("multer");
const { auth } = require("../../middlewares/auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/contentImage");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const postRouter = express.Router();
postRouter.post("/post", auth, upload.single("contentImage"), httpPostContent);
postRouter.get("/post/all", auth, httpGetAllPosts);
postRouter.get("/post/:postId", auth, httpGetPost);
postRouter.put("/post/like/:postId", auth, httpLikePost);
postRouter.post("/post/comment/:postId", auth, httpComment);
module.exports = postRouter;

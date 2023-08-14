const express = require("express");
const { httpPostContent } = require("./post.controller");
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

module.exports = postRouter;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const userRouter = require("./controllers/user/user.router");
const postRouter = require("./controllers/Post/post.router");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(postRouter);
app.use(
  "/image",
  express.static(path.join(__dirname, "..", "src", "uploads", "contentImage"))
);

module.exports = app;

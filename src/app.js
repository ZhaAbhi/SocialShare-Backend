const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./controllers/user/user.router");
const postRouter = require("./controllers/post/post.router");
const path = require('path')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("combined"));

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(userRouter);
app.use(postRouter);

module.exports = app;

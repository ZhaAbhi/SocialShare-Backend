const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./controllers/user/user.router");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use(userRouter);

module.exports = app;

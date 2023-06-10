const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./controllers/user.router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.use(userRouter);

module.exports = app;

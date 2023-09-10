const express = require("express");
const { httpAccessChat, httpFetchChat } = require("./chat.controller");
const { auth } = require("../../middlewares/auth");

const chatRouter = express.Router();

chatRouter.get("/chat/accessChat/:userId", auth, httpAccessChat);
chatRouter.get("/chat/fetchChat", auth, httpFetchChat);

module.exports = chatRouter;

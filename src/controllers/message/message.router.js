const express = require("express");
const { auth } = require("../../middlewares/auth");
const { httpSendMessage, httpAllMessages } = require("./message.controller");

const messageRouter = express.Router();

messageRouter.post("/message", auth, httpSendMessage);
messageRouter.get("/message/:chatId", auth, httpAllMessages);

module.exports = messageRouter;

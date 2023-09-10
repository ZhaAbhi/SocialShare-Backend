const messages = require("../../models/message/message.mongo");
const users = require("../../models/user/user.mongo");
const chats = require("../../models/chat/chat.mongo");

async function httpSendMessage(req, res) {
  const { id } = req.user;
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await messages.create(newMessage);
    message = await messages.populate(message, "sender", "username");
    message = await messages.populate(message, "chat");
    message = await users.populate(message, {
      path: "chat.users",
      select: "username email",
    });
    await chats.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
async function httpAllMessages(req, res) {
  try {
    const allMessages = await messages
      .find({ chat: req.params.chatId })
      .populate("sender", "username email")
      .populate("chat");

    res.json(allMessages);
  } catch (error) {
    res.sendStatus(400);
  }
}

module.exports = {
  httpSendMessage,
  httpAllMessages,
};

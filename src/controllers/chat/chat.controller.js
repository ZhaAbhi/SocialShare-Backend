const chats = require("../../models/chat/chat.mongo");
const users = require("../../models/user/user.mongo");

async function httpAccessChat(req, res) {
  const { id } = req.user;
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "No user id sent from params" });
  }

  var isChat = await chats
    .find({
      $and: [
        { users: { $elemMatch: { $eq: id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await users.populate(isChat, {
    path: "latestMessage.sender",
    select: "username email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      users: [id, userId],
    };
    try {
      const createdChat = await chats.create(chatData);

      const fullChat = await chats
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");
      res.status(200).send(fullChat);
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong!" });
    }
  }
}

async function httpFetchChat(req, res) {
  const { id } = req.user;
  try {
    await chats
      .find({ users: { $elemMatch: { $eq: id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await users.populate(results, {
          path: "latestMessage.sender",
          select: "username email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  httpAccessChat,
  httpFetchChat,
};

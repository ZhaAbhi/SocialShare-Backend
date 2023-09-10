const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);

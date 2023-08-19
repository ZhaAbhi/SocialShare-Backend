const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    contentImage: {
      type: String,
    },
    postedBy: {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
    },
    likes: [{ ref: "User", type: mongoose.SchemaTypes.ObjectId }],
    comments: [
      {
        commentContent: {
          type: String,
        },
        commentsBy: {
          ref: "User",
          type: mongoose.SchemaTypes.ObjectId,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

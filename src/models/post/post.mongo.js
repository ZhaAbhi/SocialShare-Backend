const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    postImage: {
      type: String,
    },
    postedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

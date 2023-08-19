const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    posts: [{ ref: "Post", type: mongoose.SchemaTypes.ObjectId }],
    likes: [{ ref: "Post", type: mongoose.SchemaTypes.ObjectId }],
    comments: [{ ref: "Post", type: mongoose.SchemaTypes.ObjectId }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

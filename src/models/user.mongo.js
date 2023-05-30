const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  profileDescription: {
    type: String,
  },
  accountCreationDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);

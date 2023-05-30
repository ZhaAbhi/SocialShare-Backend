const { findUserByName, saveGithubLoginUser } = require("../models/user.model");
const users = require("../models/user.mongo");
const bcrypt = require("bcrypt");

const httpSaveGithubLoginUser = async (req, res) => {
  const user = req.body;
  if (!user.name || !githubId) {
    return res.status(400).json({ error: "Field must not be empty!" });
  }
  try {
    const getUser = await findUserByName(user.name);
    if (getUser) {
      return res.status(400).json({ error: "User already exists!" });
    }
    await saveGithubLoginUser(user);
    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ error: "Error saving user information!" });
  }
};

//Function to register the user
const httpRegisterUser = async (req, res) => {
  const user = req.body;
  if (!user.username || !user.email || !user.password) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const getUser = await users.findOne({ email: user.email });
  if (getUser) {
    return res.status(400).json({ error: "User already exists!" });
  }
  const getExistingUsername = await users.findOne({ username: user.username });
  if (getExistingUsername) {
    return res.status(400).json({ error: "Username already exists!" });
  }
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (hashedPassword) {
      await users.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        accountCreationDate: Date.now(),
      });
    }
    return res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const httpLogin = (req, res) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(400).json({ error: "All field are required" });
  }
};

module.exports = {
  httpSaveGithubLoginUser,
  httpRegisterUser,
};

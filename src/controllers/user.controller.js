const { findUser } = require("../models/user.model");
const users = require("../models/user.mongo");

async function httpRegister(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const getUserByEmail = await findUser({ email });
  const getUserByUsername = await findUser({ username });
  if (getUserByEmail || getUserByUsername) {
    return res.status(400).json({ error: "User already exists!" });
  }
  try {
    const newUser = await users.create({
      username,
      email,
      password,
    });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

module.exports = {
  httpRegister,
};

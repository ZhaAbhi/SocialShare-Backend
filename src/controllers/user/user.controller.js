const bcrypt = require("bcrypt");
const users = require("../../models/user/user.mongo");

async function httpRegisterUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const existsUserWithEmail = await users.findOne({ email });
  const existsUserWithUsername = await users.findOne({ username });
  if (existsUserWithEmail) {
    return res.status(400).json({ error: "User with email already exists!" });
  }
  if (existsUserWithUsername) {
    return res
      .status(400)
      .json({ error: "User with username already exists!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await users.create({
    username,
    email,
    password: hashedPassword,
  });
  return res.status(201).json({ message: "User created successfully" });
}

module.exports = {
  httpRegisterUser,
};

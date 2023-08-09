const bcrypt = require("bcrypt");
const { queryUser, saveUser } = require("../../models/user/user.model");

async function httpRegister(req, res) {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const userWithEmail = await queryUser({ email });
  const userWithUsername = await queryUser({ username });
  if (userWithEmail) {
    return res.status(400).json({ error: "Email address already exists!" });
  }
  if (userWithUsername) {
    return res.status(400).json({ error: "Username already exists!" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await saveUser({
    username,
    email,
    password: hashPassword,
  });
  return res.status(201).json({ success: "User registered successfully!" });
}

module.exports = {
  httpRegister,
};

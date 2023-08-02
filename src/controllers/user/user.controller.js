const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

async function httpLoginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const existsUserWithEmail = await users.findOne({ email });
  if (!existsUserWithEmail) {
    return res.status(400).json({ error: "User with email doesnot exists!" });
  }
  const userPassword = existsUserWithEmail.password;
  const comparehashPassword = await bcrypt.compare(password, userPassword);
  if (!comparehashPassword) {
    return res.status(400).json({ error: "Password didn't matched!" });
  }
  const payload = {
    id: existsUserWithEmail._id,
    username: existsUserWithEmail.username,
    email: existsUserWithEmail.email,
  };
  const token = jwt.sign(payload, "shhhhh");
  if (token) {
    return res.status(201).json({ AccessToken: token });
  }
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
};

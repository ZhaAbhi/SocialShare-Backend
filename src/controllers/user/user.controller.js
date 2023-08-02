const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../../models/user/user.mongo");
const { queryUser, saveUser } = require("../../models/user/user.model");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function httpRegisterUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const existsUserWithEmail = await queryUser({ email });
  const existsUserWithUsername = await queryUser({ username });
  if (existsUserWithEmail) {
    return res.status(400).json({ error: "User with email already exists!" });
  }
  if (existsUserWithUsername) {
    return res
      .status(400)
      .json({ error: "User with username already exists!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await saveUser({
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
  const existsUserWithEmail = await queryUser({ email });
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
  const token = jwt.sign(payload, JWT_SECRET);
  if (token) {
    return res.status(201).json({ AccessToken: token });
  }
}

async function httpGetUser(req, res) {
  const user = req.user;
  return res.status(200).json({ user: user });
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
  httpGetUser,
};

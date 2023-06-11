const { findUser, saveUser } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

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
  const hashPassword = await bcrypt.hash(password, 10);
  if (hashPassword) {
    try {
      await saveUser({ username, email, password: hashPassword });
      return res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error!" });
    }
  }
}

async function httpLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  try {
    const getUser = await findUser({ email });
    if (!getUser) {
      return res.status(400).json({ error: "User does not exists!" });
    }
    //match the hash password
    const matchHashPassword = await bcrypt.compare(password, getUser.password);
    if (!matchHashPassword) {
      return res.status(400).json({ error: "Password did not matched!" });
    }
    //generate the jwt token
    const payload = {
      userId: getUser._id,
    };
    const accessToken = jwt.sign(payload, JWT_SECRET);
    return res.status(201).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

async function httpHome(req, res) {
  const { userId } = req.user;
  try {
    const getUser = await findUser({ _id: userId });
    if (!getUser) {
      return res.status(400).json({ error: "Could not found user!" });
    }
    getUser.password = null;
    return res.status(200).json({ user: getUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

module.exports = {
  httpRegister,
  httpLogin,
  httpHome,
};

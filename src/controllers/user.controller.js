const { findUser } = require("../models/user.model");
const users = require("../models/user.mongo");
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
      const newUser = await users.create({
        username,
        email,
        password: hashPassword,
      });
      await newUser.save();
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

module.exports = {
  httpRegister,
  httpLogin,
};

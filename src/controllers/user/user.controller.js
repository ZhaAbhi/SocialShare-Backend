const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryUser, saveUser } = require("../../models/user/user.model");
const { sendError, sendSuccess } = require("../../services/responseHandler");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function httpHome(req, res) {
  const user = req.user;
  return sendSuccess(res, 200, user);
}

async function httpRegister(req, res) {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return sendError(res, 400, "All fields are required!");
  }
  const userWithEmail = await queryUser({ email });
  if (userWithEmail) {
    return sendError(res, 400, "Email address already exists!");
  }
  const userWithUsername = await queryUser({ username });
  if (userWithUsername) {
    return sendError(res, 400, "Username already exists!");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await saveUser({
    username,
    email,
    password: hashPassword,
  });
  return sendSuccess(res, 201, { success: "User registered successfully!" });
}

async function httpLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, 400, "All fields are required!");
  }
  const user = await queryUser({ email });
  if (!user) {
    return sendError(res, 400, "User with email does not exists!");
  }
  const comparePasswordHash = bcrypt.compare(password, user.password);
  if (!comparePasswordHash) {
    return sendError(res, 400, "Password did not matched!");
  }
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  if (token) {
    return sendSuccess(res, 201, { accessToken: token });
  }
}

module.exports = {
  httpRegister,
  httpLogin,
  httpHome,
};

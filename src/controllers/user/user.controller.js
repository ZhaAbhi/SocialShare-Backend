const bcrypt = require("bcrypt");
const users = require("../../models/user/user.mongo");
const jwt = require("jsonwebtoken");
const { queryUser, saveUser } = require("../../models/user/user.model");
const { sendError, sendSuccess } = require("../../services/responseHandler");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function httpHome(req, res) {
  const { id } = req.user;
  const user = await users.findById({ _id: id }).select("-password -posts");
  if (!user) {
    return res.status(400).json({ error: "No user found!" });
  }
  return res.status(200).json(user);
}

async function httpGetAllUser(req, res) {
  const { id } = req.user;
  const getAllUser = await users.find({ _id: { $ne: id } }).select("-password");
  return res.status(200).json(getAllUser);
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

async function httpFollowUser(req, res) {
  const { id } = req.user;
  const { followId } = req.params;
  const getUser = await users.findById({ _id: followId });
  if (!getUser) {
    return res.status(400).json({ error: "User does not exists!" });
  }
  const isFollowing = getUser.followers.includes(id);
  const option = isFollowing ? "$pull" : "$addToSet";

  await users.findByIdAndUpdate(
    { _id: id },
    { [option]: { followings: followId } }
  );
  await users
    .findByIdAndUpdate({ _id: followId }, { [option]: { followers: id } })
    .then((results) => {
      return res.status(201).json(results);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error: "Something went wrong" });
    });
}

async function httpGetUserById(req, res) {
  const { userId } = req.params;
  const getUser = await users.findById({ _id: userId }).select("-password");
  if (!getUser) {
    return res.status(400).json({ error: "User does not exists!" });
  }
  return res.status(200).json(getUser);
}

async function httpGetUserPost(req, res) {
  const { userId } = req.params;
  const getUserPost = await users.findById({ _id: userId }).populate("posts");

  if (!getUserPost) {
    return res.status(400).json({ error: "No posts!" });
  }

  return res.status(200).json(getUserPost);
}

module.exports = {
  httpRegister,
  httpLogin,
  httpGetAllUser,
  httpHome,
  httpFollowUser,
  httpGetUserById,
  httpGetUserPost,
};

const bcrypt = require("bcrypt");
const { queryUser, saveUser } = require("../../models/user/user.model");

function sendError(res, statusCode, errorMessage) {
  return res.status(statusCode).json({ error: errorMessage });
}

function sendSuccess(res, statusCode, successMessage) {
  return res.status(statusCode).json(successMessage);
}
async function httpRegister(req, res) {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields are required!" });
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

module.exports = {
  httpRegister,
};

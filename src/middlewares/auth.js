const jwt = require("jsonwebtoken");
const { sendError } = require("../services/responseHandler");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(res, 403, "Invalid access token");
  }
  const accessToken = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(accessToken, JWT_SECRET);
    req.user = decode;
  } catch (error) {
    return sendError(res, 403, "Invalid access token");
  }
  return next();
}

module.exports = {
  auth,
};

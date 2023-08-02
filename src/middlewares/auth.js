const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Invalid access token!" });
  }
  const accessToken = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(accessToken, JWT_SECRET);
    req.user = decode;
  } catch (error) {
    return res.status(400).json({ error: "Invalid access token!" });
  }
  return next();
}

module.exports = {
  auth,
};

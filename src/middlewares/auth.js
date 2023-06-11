const jwt = require("jwt");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(400).json({ error: "UnAuthorized user!" });
  }
  try {
    const decode = jwt.verify(accessToken, JWT_SECRET);
    req.user = decode;
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
  next();
}

module.exports = {
  auth,
};

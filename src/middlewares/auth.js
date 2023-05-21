const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticatedUser = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decode = jwt.decode(token, JWT_SECRET);
    req.user = decode;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Invalid token" });
  }
  return next();
};

module.exports = {
  authenticatedUser,
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function auth(req, res, next) {
  const authHeader = await req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "UnAuthorized user!" });
  }
  const accessToken = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(accessToken, JWT_SECRET);
    if (decode) {
      req.user = decode;
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
  next();
}

module.exports = {
  auth,
};

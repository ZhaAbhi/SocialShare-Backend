const bcrypt = require("bcrypt");
const users = require("../../models/user/user.mongo");

async function httpRegisterUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  //1. checking if the username and email is already taken or not
  //2. hashing the password
  //3. saving the user to database
}

module.exports = {
  httpRegisterUser,
};

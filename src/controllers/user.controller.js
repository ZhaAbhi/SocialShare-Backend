const { findUserByName, saveGithubLoginUser } = require("../models/user.model");

const httpSaveGithubLoginUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  if (!user.name) {
    return res.status(400).json({ error: "Field must not be empty!" });
  }
  try {
    const getUser = await findUserByName(user.name);
    if (getUser) {
      return res.status(400).json({ error: "User already exists!" });
    }
    await saveGithubLoginUser(user);
    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ error: "Error saving user information!" });
  }
};

module.exports = {
  httpSaveGithubLoginUser,
};

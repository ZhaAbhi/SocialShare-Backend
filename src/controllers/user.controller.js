const { findUser, saveUser } = require("../models/user.model");

const httpSaveUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  if (!user.name) {
    return res.status(400).json({ error: "Field must not be empty!" });
  }
  try {
    const getUser = await findUser(user.name);
    if (getUser) {
      return res.status(400).json({ error: "User already exists!" });
    }
    await saveUser(user);
    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ error: "Error saving user information!" });
  }
};

module.exports = {
  httpSaveUser,
};

const users = require("../models/user.mongo");

async function findUser(query) {
  try {
    return users.findOne(query);
  } catch (error) {
    throw new Error("Could not query database");
  }
}

async function saveUser(userData) {
  const { username, email, password } = userData;
  try {
    const createUser = await users.create({
      username,
      email,
      password,
    });
    await createUser.save();
  } catch (error) {
    throw new Error("Could not save user to database");
  }
}

module.exports = {
  findUser,
  saveUser,
};

const users = require("./user.mongo");

async function queryUser(query) {
  try {
    const user = await users.findOne(query);
    return user;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}

async function saveUser(user) {
  try {
    const createNewUser = await users.create(user);
    await createNewUser.save();
    return createNewUser;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}

module.exports = {
  queryUser,
  saveUser,
};

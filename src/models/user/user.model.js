const users = require("../user/user.mongo");

async function queryUser(query) {
  try {
    const user = await users.findOne(query);
    return user;
  } catch (error) {
    throw new Error({ error: "Something went wrong!" });
  }
}

async function saveUser(user) {
  try {
    await users.create(user);
  } catch (error) {
    throw new Error({ error: "Something went wrong!" });
  }
}

module.exports = {
  queryUser,
  saveUser,
};

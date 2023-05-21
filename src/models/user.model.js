const users = require("./user.mongo");

//findUser
//Save user

async function findUser(name) {
  return await users.findOne({ name });
}

async function saveUser(user) {
  return await users.updateOne({ name: user.name }, user, { upsert: true });
}

module.exports = {
  findUser,
  saveUser,
};

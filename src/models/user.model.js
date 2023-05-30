const users = require("./user.mongo");

async function findUserByName(name) {
  return await users.findOne({ name });
}

async function saveGithubLoginUser(user) {
  return await users.updateOne({ name: user.name }, user, { upsert: true });
}

//find user by email
async function findUserByEmail(email) {
  return await users.findOne({ email });
}
//save user to users collection

async function saveUser(user) {
  return await users.updateOne({ email: user.email }, user, { upsert: true });
}

module.exports = {
  findUserByName,
  saveGithubLoginUser,
  findUserByEmail,
  saveUser,
};

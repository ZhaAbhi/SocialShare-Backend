const users = require("./user.mongo");

async function findUserByName(name) {
  return await users.findOne({ name });
}

async function saveGithubLoginUser(user) {
  return await users.updateOne({ name: user.name }, user, { upsert: true });
}

module.exports = {
  findUserByName,
  saveGithubLoginUser,
};

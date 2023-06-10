const users = require("../models/user.mongo");

async function findUser(query) {
  try {
    return users.findOne(query);
  } catch (error) {
    throw new Error("Could not query database");
  }
}

module.exports = {
  findUser,
};

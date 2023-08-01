const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("Mongo connected successfully!");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connectiong to mongo database", error);
});

async function connectMongo() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  connectMongo,
};

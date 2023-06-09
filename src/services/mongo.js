const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connected successfully!");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting MongoDB", error);
});

async function connectMongo() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  connectMongo,
};

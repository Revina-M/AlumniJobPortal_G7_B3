const mongoose = require("mongoose");
require("dotenv").config();
dbConnect();
async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("Mongo DB connection unsuccessful");
  }
}

module.exports = mongoose;

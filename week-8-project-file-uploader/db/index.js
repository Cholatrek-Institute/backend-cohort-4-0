require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/fileUploader' || process.env.DB_URL)
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;

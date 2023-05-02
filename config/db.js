const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Connected to mongoDB ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error is: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;

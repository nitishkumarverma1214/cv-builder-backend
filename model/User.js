const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  username: {
    type: String,
    uniquie: true,
    required: true,
  },
  email: {
    type: String,
    uniquie: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

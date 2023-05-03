const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
  },
  institution: {
    type: String,
  },
  percent: {
    type: String,
  },
});

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;

const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  organization: {
    type: String,
  },
  joinDate: {
    type: String,
  },
  lastDate: {
    type: String,
  },
  position: {
    type: String,
  },
  location: {
    type: String,
  },
  ctc: {
    type: Number,
  },
  technologies: {
    type: Number,
  },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;

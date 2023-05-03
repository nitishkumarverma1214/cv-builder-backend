const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  teamSize: {
    type: Number,
  },
  duration: {
    type: String,
  },
  technologies: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;

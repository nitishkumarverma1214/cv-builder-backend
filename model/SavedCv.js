const mongoose = require("mongoose");

const savedCvSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  basicDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BasicDetails",
  },
  experience: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
    },
  ],
  education: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Education",
    },
  ],

  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const savedCv = mongoose.model("SavedCv", savedCvSchema);
module.exports = savedCv;

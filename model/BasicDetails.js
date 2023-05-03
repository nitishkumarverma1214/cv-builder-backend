const mongoose = require("mongoose");

const basicDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  intro: {
    type: String,
  },
});

const BasicDetails = mongoose.model("BasicDetails", basicDetailsSchema);
module.exports = BasicDetails;

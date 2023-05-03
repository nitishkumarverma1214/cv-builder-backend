const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  status: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;

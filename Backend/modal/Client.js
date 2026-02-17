const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  creditDays: Number
});

module.exports = mongoose.model("Client", ClientSchema);

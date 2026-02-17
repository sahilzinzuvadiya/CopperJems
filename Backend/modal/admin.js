const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  department: String,
  role: {
    type: String,
    default: "admin"
  },
    walletBalance: {
    type: Number,
    default: 0
  },
  forcePasswordChange: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Admin", adminSchema);

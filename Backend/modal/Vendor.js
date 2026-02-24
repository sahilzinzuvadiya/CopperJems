const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: String,
  address: String,

  creditDays: {
    type: Number,
    default: 0
  },

  isActive: {
    type: Boolean,
    default: true
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);

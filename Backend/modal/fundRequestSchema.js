const mongoose = require("mongoose");

const fundRequestSchema = new mongoose.Schema({
  amount: Number,
  reason: String,

purchaseRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseRequest"
  },

  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },

approvedBy: {
  type: String,
  default: null
}


}, { timestamps: true });

module.exports = mongoose.model("FundRequest", fundRequestSchema);

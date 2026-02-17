const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },

  wireType: String,
  qty: Number,
  rate: Number,
  total: Number,

  invoiceNo: String,

  saleDate: {
    type: Date,
    default: Date.now
  },

  dueDate: Date,

  pdf: String,

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING"
  },

  reminderReady: { type: Boolean, default: false }

}, { timestamps: true }); // ⭐ VERY IMPORTANT

module.exports = mongoose.model("Invoice", InvoiceSchema);

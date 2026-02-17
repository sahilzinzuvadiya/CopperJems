const mongoose = require("mongoose");

const productionSchema = new mongoose.Schema({
  prId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseRequest",
    required: true
  },

  materialName: String, // copper

  wireType: {
    type: String,
    enum: ["9mm", "12mm", "6mm"],
    required: true
  },

  rawQtyUsed: {
    type: Number,
    required: true
  },

  outputQty: Number,

  status: {
    type: String,
    enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
    default: "PENDING"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },

  completedAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Production", productionSchema);

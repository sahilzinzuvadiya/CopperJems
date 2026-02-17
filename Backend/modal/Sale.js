const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  wireType: String,
  qty: Number,
  ratePerTon: Number,
  totalAmount: Number,

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },

  soldBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"   // or "Employee"
  },

  finishedGoodsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FinishedGoods"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", SaleSchema);

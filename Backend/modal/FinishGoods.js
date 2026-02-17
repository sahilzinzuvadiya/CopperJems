const mongoose = require("mongoose");

const FinishedGoodsSchema = new mongoose.Schema({
  wireType: String,
  totalQty: Number,
  soldQty: { type: Number, default: 0 },

  productionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Production"
  },

  status: {
    type: String,
    default: "PENDING_SALES_APPROVAL"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FinishedGoods", FinishedGoodsSchema);


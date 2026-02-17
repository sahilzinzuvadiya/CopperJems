const mongoose = require("mongoose");

const grnSchema = new mongoose.Schema(
  {
    receivedQty: {
      type: Number,
      required: true
    },
    damagedQty: {
      type: Number,
      default: 0
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    remarks: String,
    receivedDate: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const purchaseRequestSchema = new mongoose.Schema(
  {
    materialName: String,
    quantity: Number, // ORDERED QTY (FIXED)
    expectedPrice: Number,
    department: String,

    totalAmount: {
      type: Number,
      default: 0
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    /* ===== STATUS ===== */
    status: {
      type: String,
      enum: [
        "PENDING_ADMIN",
        "ADMIN_APPROVED",
        "SUPERADMIN_APPROVED",
        "PAYMENT_COMPLETED",
        "RECEIVING_IN_PROGRESS",
        "RAW_MATERIAL_RECEIVED",
        "FULLY_RECEIVED",
        "MANUFACTURED",
        "CLOSED"
      ],
      default: "PENDING_ADMIN"
    },

    /* ===== APPROVERS ===== */
    adminApprovedBy: mongoose.Schema.Types.ObjectId,

    superAdminApprovedBy: {
      type: Number, // superadmin id = 1
      default: null
    },

    productionUsed: {
      type: Number,
      default: 0
    },
    /* ===== PAYMENT ===== */
    paymentDetails: {
      receiptNo: String,
      paymentDate: Date,
      paidBy: mongoose.Schema.Types.ObjectId,
    },

    quantityReceived: {
      type: Number,
      default: 0
    },

    /* ===== MULTIPLE GRNs ===== */
    grns: [grnSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchaseRequest", purchaseRequestSchema);

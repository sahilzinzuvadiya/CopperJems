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
    quantity: Number,
    expectedPrice: Number,
    department: String,

    totalAmount: { type: Number, default: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },

    /* ===== VENDOR + PO ===== */
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", default: null },

    finalRate: { type: Number, default: 0 },

    poNumber: { type: String, default: null },

    creditDays: { type: Number, default: 0 },

    dueDate: Date,

    rejectionReason: String,

    vendorMsgSent: {
      type: Boolean,
      default: false
    },
    /* ===== PRODUCTION ===== */
productionUsed: { type: Number, default: 0 },

    /* ===== PAYMENT ===== */
    paymentDone: { type: Boolean, default: false },
    amountPaid: { type: Number, default: 0 },
    balanceAmount: { type: Number, default: 0 },

    paymentDetails: {
      receiptNo: { type: String, default: null },
      paymentDate: { type: Date, default: null },
      paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default: null
      },
      amount: { type: Number, default: 0 }
    },

    /* ===== STATUS ===== */
    status: {
      type: String,
      enum: [
        "PENDING_ADMIN",
        "PO_CREATED",
        "PO_APPROVED",
        "PO_REJECTED",
        "PAYMENT_PENDING",
        "PAYMENT_COMPLETED",
        "RECEIVING_IN_PROGRESS",
        "RAW_MATERIAL_RECEIVED",
        "FULLY_RECEIVED",
        "CLOSED",
        "ADMIN_APPROVED",
        "SUPERADMIN_APPROVED",
        "ADMIN_REJECTED"
      ],
      default: "PENDING_ADMIN"
    },

    adminApprovedBy: mongoose.Schema.Types.ObjectId,
    superAdminApprovedBy: {
      type: String,
      default: null
    },

    quantityReceived: { type: Number, default: 0 },

    grns: [grnSchema],

    logs: [
      {
        text: String,
        date: { type: Date, default: Date.now }
      }
    ]

  },
  { timestamps: true }
);

purchaseRequestSchema.index({ status: 1 });
purchaseRequestSchema.index({ vendor: 1 });
purchaseRequestSchema.index({ poNumber: 1 });

module.exports = mongoose.model("PurchaseRequest", purchaseRequestSchema);





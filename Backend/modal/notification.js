const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },

    // who should see this
    roleTarget: {
      type: String,
      enum: ["superadmin", "admin", "employee"],
      required: true
    },

    // optional (for admin/employee)
    departmentTarget: {
      type: String,
      default: null
    },

    // optional (single user notification)
    userTarget: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },

    type: {
  type: String,
  enum: [
    "INFO",
    "REQUEST",
    "APPROVAL",
    "REJECT",
    "PAYMENT",     // ⭐ ADD THIS
    "PRODUCTION",
    "INVOICE",
    "GRN",
    "STOCK",
    "SALE",
    "CLIENT",
    "EMPLOYEE"
  ],
  default: "INFO"
},
    isRead: { type: Boolean, default: false },

    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

// 🔥 AUTO DELETE AFTER EXPIRY
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Notification", notificationSchema);

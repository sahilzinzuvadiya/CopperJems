const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,

    department: {
      type: String,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);

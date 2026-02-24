require("dotenv").config(); // load env variables

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const authroute=require("./route/authroute")
const remoinder=require("./cron/reminderCron")

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= DB CONNECTION ================= */
connectDB();



/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});


app.use("/api/auth",authroute);
app.use("/api/admin", require("./route/adminroute"));
app.use("/api/employee", require("./route/employeeroute"));
app.use("/api/notifications", require("./route/notificationroute"));
app.use("/api/purchase", require("./route/Purchaseroute"));
app.use("/api/account", require("./route/accountroute"));
app.use("/api/grn", require("./route/grnroute"));
app.use("/api/production", require("./route/Productionroute"));
app.use("/api/sales", require("./route/salesroute"));
app.use("/api/generateinvoice", require("./route/generateinvoiceroute"));
app.use("/api/superadmin", require("./route/SuperAdminDashboardRoute"));
app.use("/api/admindashboard", require("./route/AdminDashboardRoute"));
app.use("/api/employeedashboard", require("./route/EmployeeDashboardRoute"));
app.use("/api/vendor", require("./route/Vendorroute"));



/* ================= SERVER ================= */
const PORT = process.env.PORT || 1005;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

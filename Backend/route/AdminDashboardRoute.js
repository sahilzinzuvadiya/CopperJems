const router = require("express").Router();
const protect = require("../middleware/authmiddleware");
const { getAdminDashboard } = require("../controller/AdminDashboardctl");

router.get("/stats", protect, getAdminDashboard);

module.exports = router;

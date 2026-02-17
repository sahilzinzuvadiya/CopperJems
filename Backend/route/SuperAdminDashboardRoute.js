const router = require("express").Router();
const { getDashboardStats,getAnalytics } = require("../controller/SuperAdminDashboardctl");
const protect = require("../middleware/authmiddleware");

router.get("/stats", getDashboardStats);
router.get("/analytics", protect ,getAnalytics);

module.exports = router;

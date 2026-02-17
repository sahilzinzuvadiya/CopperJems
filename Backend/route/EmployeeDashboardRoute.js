const router = require("express").Router();
const protect = require("../middleware/authmiddleware");
const { getEmployeeDashboard} = require("../controller/EmployeeDashboardctl");

router.get("/stats", protect, getEmployeeDashboard);


module.exports = router;

const router = require("express").Router();
const protect = require("../middleware/authmiddleware");

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  changePassword,
  getAllEmployeesForSuperAdmin
} = require("../controller/employeectl");

router.post("/create", protect, createEmployee);
router.get("/all", protect, getEmployees);
router.put("/update/:id", protect, updateEmployee);
router.delete("/delete/:id", protect, deleteEmployee);
router.post("/change-password", protect, changePassword);
router.get("/superadmin/all", protect, getAllEmployeesForSuperAdmin);

module.exports = router;

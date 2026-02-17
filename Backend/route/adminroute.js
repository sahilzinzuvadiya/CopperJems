const router = require("express").Router();
const protect = require("../middleware/authmiddleware");

const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  changePassword
} = require("../controller/adminctl");

router.post("/create", protect, createAdmin);
router.get("/all", protect, getAdmins);
router.put("/update/:id", protect, updateAdmin);
router.delete("/delete/:id", protect, deleteAdmin);
router.post("/change-password", protect, changePassword);


module.exports = router;

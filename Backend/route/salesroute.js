const router = require("express").Router();
const ctl=require("../controller/Salesctl")
const protect = require("../middleware/authmiddleware");

router.get("/pending", protect,ctl.getPendingStock);
router.put("/approve/:id",protect, ctl.approveStock);

router.get("/stock",protect, ctl.getSaleStock);
router.post("/sell", protect,ctl.sellProduct);
router.get("/history",protect, ctl.getSalesHistory);

module.exports = router; 
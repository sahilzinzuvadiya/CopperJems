const router = require("express").Router();
const Vendor = require("../modal/Vendor");
const protect = require("../middleware/authmiddleware");

/* =========================
CREATE VENDOR
========================= */
router.post("/create", protect, async (req, res) => {
  try {

    const vendor = await Vendor.create(req.body);

    res.json(vendor);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* =========================
GET ALL VENDORS
========================= */
router.get("/Vendorall", protect, async (req, res) => {
  try {

    const vendors = await Vendor.find().sort({ createdAt: -1 });

    res.json(vendors);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

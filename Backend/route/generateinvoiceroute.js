const router = require("express").Router();
const protect = require("../middleware/authmiddleware");

const {
  generateInvoice,
} = require("../controller/generateinvoicectl");

router.post("/create", protect, generateInvoice);


module.exports = router;
const express = require("express");
const router = express.Router();
const ctl = require("../controller/Productionctl");
const protect = require("../middleware/authmiddleware");

// create plan (manufacturing admin)
router.post("/create", protect,ctl.createProduction);

// employee start
router.put("/start/:id", ctl.startProduction);

// employee complete
router.put("/complete/:id", protect,ctl.completeProduction);

router.get("/completed", ctl.getCompletedProduction);


// get all
router.get("/", ctl.getAllProduction);

router.get("/production-ready", ctl.getProductionReady);


module.exports = router;

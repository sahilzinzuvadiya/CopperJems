const express = require("express");
const ctl = require("../controller/authctl");

const router = express.Router();

router.post("/login",ctl.login);

module.exports = router;

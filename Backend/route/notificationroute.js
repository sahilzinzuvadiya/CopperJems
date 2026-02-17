const router = require("express").Router();
const {
  getMyNotifications,

} = require("../controller/notificationctl");
const protect = require("../middleware/authmiddleware");


router.get("/", protect, getMyNotifications);


module.exports = router;

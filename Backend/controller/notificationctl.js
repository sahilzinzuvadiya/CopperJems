const mongoose = require("mongoose");
const Notification = require("../modal/notification");

/* ================= CREATE NOTIFICATION ================= */
exports.createNotification = async ({
  title,
  message,
  roleTarget,
  departmentTarget = null,
  userTarget = null,
  type = "INFO"
}) => {
  return Notification.create({
    title,
    message,
    roleTarget,
    departmentTarget,
    userTarget:
      userTarget && mongoose.Types.ObjectId.isValid(userTarget)
        ? userTarget
        : null,
    type,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h
  });
};

/* ================= FETCH MY NOTIFICATIONS ================= */
exports.getMyNotifications = async (req, res) => {
  try {
    const { role, department, id } = req.user;

    const conditions = [];

    /* ================= USER SPECIFIC ================= */
    if (mongoose.Types.ObjectId.isValid(id)) {
      conditions.push({
        userTarget: new mongoose.Types.ObjectId(id)
      });
    }

    /* ================= SUPERADMIN ================= */
    if (role === "superadmin") {
      conditions.push({
        roleTarget: "superadmin"
      });
    }

    /* ================= ADMIN ================= */
    if (role === "admin") {
      conditions.push({
        roleTarget: "admin",
        departmentTarget: department
      });
    }

    /* ================= EMPLOYEE ================= */
    if (role === "employee") {
      conditions.push({
        roleTarget: "employee",
        departmentTarget: department
      });
    }

    const notifications = await Notification.find({
      isRead: false,
      $or: conditions
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(notifications);
  } catch (err) {
    console.error("NOTIFICATION FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to load notifications" });
  }
};




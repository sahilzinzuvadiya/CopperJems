const mongoose = require("mongoose");
const Notification = require("../modal/notification");

const createNotification = async ({
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
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });
};

exports.getMyNotifications = async (req, res) => {
  try {
    const { role, department, id } = req.user;
    console.log(req.user);
    

    let query = {
      isRead: false,
      $or: []
    };

    /* ================= SUPERADMIN ================= */
    if (role === "superadmin") {
      query.$or.push({
        roleTarget: "superadmin"
      });
    }

    /* ================= ADMIN ================= */
    if (role === "admin") {
      query.$or.push({
        roleTarget: "admin",
        departmentTarget: department   // ⭐ MUST match department
      });
    }

    /* ================= EMPLOYEE ================= */
    if (role === "employee") {
      query.$or.push({
        roleTarget: "employee",
        departmentTarget: department
      });
    }

    /* ================= USER SPECIFIC ================= */
    if (mongoose.Types.ObjectId.isValid(id)) {
      query.$or.push({
        userTarget: new mongoose.Types.ObjectId(id)
      });
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(notifications);

  } catch (err) {
    console.error("NOTIFICATION FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to load notifications" });
  }
};




module.exports = createNotification;

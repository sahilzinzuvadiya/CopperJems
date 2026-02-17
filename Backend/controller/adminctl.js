const Admin = require("../modal/admin");
const bcrypt = require("bcryptjs");

/* CREATE ADMIN (already exists) */
exports.createAdmin = async (req, res) => {
  const { email, department } = req.body;

  const password = Math.random().toString(36).slice(-8);

  const admin = await Admin.create({
    email,
    department,
    password: await bcrypt.hash(password, 10)
  });

  res.json({
    message: "Admin created",
    email,
    password
  });
};

/* GET ALL ADMINS */
exports.getAdmins = async (req, res) => {
  const admins = await Admin.find().select("-password");
  res.json(admins);
};

/* UPDATE ADMIN */
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { email, department } = req.body;

  await Admin.findByIdAndUpdate(id, {
    email,
    department
  });

  res.json({ message: "Admin updated" });
};

/* DELETE ADMIN */
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  await Admin.findByIdAndDelete(id);

  res.json({ message: "Admin deleted" });
};

/* CHANGE PASSWORD (already exists) */
exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;

  await Admin.findByIdAndUpdate(req.user.id, {
    password: await bcrypt.hash(newPassword, 10),
    forcePasswordChange: false
  });

  res.json({ message: "Password updated" });
};

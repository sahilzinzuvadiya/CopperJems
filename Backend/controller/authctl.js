const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const superAdmins = require("../config/SuperAdmin");
const Admin = require("../modal/admin");
const Employee = require("../modal/employee");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    /* ================= SUPER ADMIN LOGIN ================= */
    const superAdmin = superAdmins.find(a => a.email === email);

    if (superAdmin) {
      const match = await bcrypt.compare(password, superAdmin.password);

      if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        {
          id: superAdmin.id,
          role: "superadmin",
          department: "all"
        },
        "COPPERJEMS_SECRET",
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        role: "superadmin",
        email: superAdmin.email,
        department: "all"
      });
    }

    /* ================= ADMIN LOGIN ================= */
    const admin = await Admin.findOne({ email });

    if (admin) {
      const match = await bcrypt.compare(password, admin.password);

      if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        {
          id: admin._id,
          role: "admin",
          department: admin.department
        },
        "COPPERJEMS_SECRET",
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        role: "admin",
        email: admin.email,
        department: admin.department
      });
    }

    /* ================= EMPLOYEE LOGIN ================= */
    const employee = await Employee.findOne({ email });

    if (!employee)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, employee.password);

    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: employee._id,
        role: "employee",
        department: employee.department
      },
      "COPPERJEMS_SECRET",
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      role: "employee",
      email: employee.email,
      department: employee.department
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

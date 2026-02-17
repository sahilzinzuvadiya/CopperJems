const Employee = require("../modal/employee");
const bcrypt = require("bcryptjs");

/* ================= CREATE ================= */
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // 🔐 generate temp password
    const plainPassword = Math.random().toString(36).slice(-8);

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // ✅ create employee
    const employee = await Employee.create({
      name,
      email,
      phone,
      password: hashedPassword,
      department: req.user.department,
      createdBy: req.user.id
    });

    await createNotification({
      title: "New Employee Created",
      message: `${employee.name} added to ${employee.department} department`,
      roleTarget: "superadmin",
      type: "EMPLOYEE"
    });

    // ✅ IMPORTANT: return structured response
    res.status(201).json({
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department
      },
      password: plainPassword
    });

  } catch (error) {
    console.error("CREATE EMPLOYEE ERROR:", error);
    res.status(500).json({ message: "Employee creation failed" });
  }
};

/* ================= GET ================= */
exports.getEmployees = async (req, res) => {
  let filter = {};

  // admin → only own department
  if (req.user.role === "admin") {
    filter.department = req.user.department;
  }

  const employees = await Employee.find(filter).sort({ createdAt: -1 });

  res.json(employees);
};

/* ================= UPDATE ================= */
exports.updateEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee)
    return res.status(404).json({ message: "Not found" });

  // admin cannot touch other departments
  if (
    req.user.role === "admin" &&
    employee.department !== req.user.department
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  Object.assign(employee, req.body);
  await employee.save();

  await createNotification({
    title: "Employee Updated",
    message: `${employee.name} details updated in ${employee.department}`,
    roleTarget: "superadmin",
    type: "EMPLOYEE"
  });


  res.json(employee);
};

/* ================= DELETE ================= */
exports.deleteEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee)
    return res.status(404).json({ message: "Not found" });

  if (
    req.user.role === "admin" &&
    employee.department !== req.user.department
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  await employee.deleteOne();

  await createNotification({
    title: "Employee Deleted",
    message: `${employee.name} removed from ${employee.department} department`,
    roleTarget: "superadmin",
    type: "EMPLOYEE"
  });


  res.json({ message: "Employee deleted" });
};
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // 🔐 get employee from token
    const employee = await Employee.findById(req.user.id);

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    // ✅ check old password
    const isMatch = await bcrypt.compare(oldPassword, employee.password);

    if (!isMatch)
      return res.status(401).json({ message: "Old password incorrect" });

    // 🔒 hash new password
    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(newPassword, salt);

    await employee.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllEmployeesForSuperAdmin = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const employees = await Employee.find()
      .populate("createdBy", "email department")
      .sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
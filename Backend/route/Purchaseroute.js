const router = require("express").Router();
const PurchaseRequest = require("../modal/PurchaseRequest");
const { createNotification } = require("../controller/notificationctl");
const protect = require("../middleware/authmiddleware");
const Admin = require("../modal/admin");   // ⭐ use Admin model

router.post("/create", protect, async (req, res) => {
  try {

    const pr = await PurchaseRequest.create({
      ...req.body,
      createdBy: req.user.id,
      department: "Purchase",
      status: "PENDING_ADMIN"
    });

    /* 🔍 FIND PURCHASE ADMIN */
    const purchaseAdmin = await Admin.findOne({
      role: "admin",
      department: "Purchase"
    });

    console.log("ADMIN FOUND:", purchaseAdmin?._id);

    /* =====================================================
        🔔 PURCHASE ADMIN ONLY
    ===================================================== */
    if (purchaseAdmin) {
      await createNotification({
        title: "New Purchase Request",
        message: `New PR created by ${req.user.name || "employee"}`,
        roleTarget: "admin",
        departmentTarget: "Purchase",
        userTarget: purchaseAdmin._id,   // ⭐ only this admin
        type: "REQUEST"
      });

      console.log("ADMIN NOTIFICATION STORED");
    }

    /* =====================================================
        🔔 SUPERADMIN
    ===================================================== */
    await createNotification({
      title: "New Purchase Request",
      message: `New PR created by ${req.user.name || "employee"}`,
      roleTarget: "superadmin",
      type: "REQUEST"
    });

    console.log("SUPERADMIN NOTIFICATION STORED");

    res.json(pr);

  } catch (err) {
    console.log("PR ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});


router.get("/my", protect, async (req, res) => {
  try {

    // only purchase employee allowed
    if (req.user.department !== "Purchase") {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const list = await PurchaseRequest.find({
      createdBy: req.user.id
    })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name");

    res.json(list);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error loading requests" });
  }
});


/* ADMIN VIEW */
router.get("/pending/admin", protect, async (req, res) => {
  console.log(req.user);

  if (req.user.role !== "admin") return res.sendStatus(403);

  const prs = await PurchaseRequest.find({

    status: "PENDING_ADMIN",
    department: req.user.department
  }).populate("createdBy", "name email");
  console.log("ALL PRS:", prs);
  res.json(prs);
});

/* ADMIN APPROVE */
router.put("/admin-approve/:id", protect, async (req, res) => {
  const pr = await PurchaseRequest.findById(req.params.id);

  pr.status = "ADMIN_APPROVED";
  pr.adminApprovedBy = req.user.id;
  await pr.save();

  await createNotification({
    title: "PR Approved by Admin",
    message: "Needs Super Admin approval",
    roleTarget: "superadmin",
    type: "APPROVAL"
  });

    await createNotification({
      title: "PR Approved by Admin",
      message: `Your purchase request for ${pr.materialName} was approved by admin.`,
      userTarget: pr.createdBy,   // ⭐ MOST IMPORTANT
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "INFO"
    });

  res.json({ success: true });
});

/* ADMIN REJECT */
router.put("/admin-reject/:id", protect, async (req, res) => {
  const pr = await PurchaseRequest.findById(req.params.id);

  pr.status = "ADMIN_REJECTED";
  pr.rejectionReason = req.body.reason;
  await pr.save();

    await createNotification({
      title: "Purchase Request Rejected",
      message: `Your request for ${pr.materialName} was rejected by admin.`,
      userTarget: pr.createdBy,        // ⭐ only that employee
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "REJECT"
    }); 

  res.json({ success: true });
});

/* SUPERADMIN VIEW */
router.get("/pending/superadmin", protect, async (req, res) => {
  console.log("ROLE FROM TOKEN:", req.user.role);
  if (req.user.role !== "superadmin") return res.sendStatus(403);

  const prs = await PurchaseRequest.find({
    status: "ADMIN_APPROVED"
  }).populate("createdBy", "name email department");

  res.json(prs);
});

/* SUPERADMIN APPROVE */
router.put("/superadmin-approve/:id", protect, async (req, res) => {
  // console.log("REQ.USER:", req.user);
  // console.log("TYPE OF ID:", typeof req.user.id);

  try {
    const pr = await PurchaseRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ message: "Purchase request not found" });
    }

    // ERP status guard
    if (pr.status !== "ADMIN_APPROVED") {
      return res.status(400).json({
        message: "Only ADMIN_APPROVED requests can be approved by Super Admin"
      });
    }

    pr.status = "SUPERADMIN_APPROVED";
    pr.paymentMode = "CASH";
    pr.superAdminApprovedBy = req.user.id; // ✅ ObjectId
    pr.rejectionReason = null;

    await pr.save();

    await createNotification({
      title: "Payment Required",
      message: "Purchase request approved. Proceed to payment.",
      roleTarget: "admin",
      departmentTarget: "Account" // ✅ FIXED
    });

      await createNotification({
      title: "PR Approved by SuperAdmin",
      message: `Your purchase request for ${pr.materialName} was approved by SuperAdmin.`,
      userTarget: pr.createdBy,   // ⭐ MOST IMPORTANT
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "INFO"
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


/* SUPERADMIN REJECT */

router.put("/superadmin-reject/:id", protect, async (req, res) => {
  try {
    const pr = await PurchaseRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ message: "Purchase request not found" });
    }

    if (pr.status !== "ADMIN_APPROVED") {
      return res.status(400).json({
        message: "Only ADMIN_APPROVED requests can be rejected"
      });
    }

    pr.status = "SUPERADMIN_REJECTED";
    pr.superAdminApprovedBy = req.user.id;
    pr.rejectionReason = req.body.reason || "Rejected by Super Admin";

    await pr.save();

     await createNotification({
      title: "Purchase Request Rejected",
      message: `Your request for ${pr.materialName} was rejected by SuperAdmin.`,
      userTarget: pr.createdBy,        // ⭐ only that employee
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "REJECT"
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

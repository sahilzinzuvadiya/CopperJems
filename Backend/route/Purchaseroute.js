const router = require("express").Router();
const PurchaseRequest = require("../modal/PurchaseRequest");
const Vendor = require("../modal/Vendor");
const { createNotification } = require("../controller/notificationctl");
const protect = require("../middleware/authmiddleware");
const Admin = require("../modal/admin");


/* =====================================================
CREATE PR (EMPLOYEE)
===================================================== */
router.post("/create", protect, async (req, res) => {
  try {
    if (req.user.department !== "Purchase") {
      return res.status(403).json({ msg: "Only purchase employee" });
    }

    const pr = await PurchaseRequest.create({
      ...req.body,
      createdBy: req.user.id,
      department: "Purchase",
      status: "PENDING_ADMIN"
    });

    /* 🔔 Purchase Admin */
    await createNotification({
      title: "New Purchase Request",
      message: `PR created for ${pr.materialName}`,
      roleTarget: "admin",
      departmentTarget: "Purchase",
      type: "PR"
    });

    res.json(pr);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});



/* =====================================================
PURCHASE ADMIN → CREATE PO
===================================================== */
router.put("/create-po/:id", protect, async (req, res) => {
  try {

    if (req.user.department !== "Purchase" || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only purchase admin" });
    }

    const { vendorId, rate } = req.body;

    const pr = await PurchaseRequest.findById(req.params.id);
    console.log("PR STATUS:", pr.status);
    if (!pr) return res.status(404).json({ msg: "PR not found" });

    // 🔥 FIX HERE
    if (pr.status !== "ADMIN_APPROVED") {
      return res.status(400).json({ msg: `Invalid status: ${pr.status}` });
    }


    if (pr.status === "PO_CREATED") {
      return res.status(400).json({ msg: "PO already created" });
    }


    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ msg: "Vendor not found" });

    /* ===== SAVE PO DATA ===== */
    pr.vendor = vendorId;
    pr.finalRate = rate;
    pr.totalAmount = pr.quantity * rate;
    pr.creditDays = vendor.creditDays;

    const due = new Date();
    due.setDate(due.getDate() + vendor.creditDays);
    pr.dueDate = due;

    pr.poNumber = "PO" + Date.now();
    pr.status = "PO_CREATED";   // 🔥 now PO created
    pr.adminApprovedBy = req.user.id;

    await pr.save();

    /* 🔔 SUPERADMIN */
    await createNotification({
      title: "PO Approval Required",
      message: `${pr.poNumber} waiting approval`,
      roleTarget: "superadmin",
      type: "PO"
    });

    res.json({ success: true, po: pr });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});




/* =====================================================
SUPERADMIN VIEW PENDING PO
===================================================== */
router.get("/pending-po", protect, async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.sendStatus(403);

  const list = await PurchaseRequest.find({
    status: "PO_CREATED"
  })
    .populate("vendor", "name phone")
    .populate("createdBy", "name");

  res.json(list);
});



/* =====================================================
SUPERADMIN APPROVE PO
===================================================== */
router.put("/approve-po/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "superadmin")
      return res.sendStatus(403);

    const pr = await PurchaseRequest.findById(req.params.id);
    if (!pr) return res.status(404).json({ msg: "PO not found" });

    // allow only once
    if (pr.status === "SUPERADMIN_APPROVED") {
      return res.json({ msg: "Already approved" });
    }

    if (pr.status !== "PO_CREATED") {
      return res.status(400).json({ msg: "Invalid status flow" });
    }

    pr.status = "SUPERADMIN_APPROVED";
    pr.superAdminApprovedBy = req.user.id;

    await pr.save();

    await createNotification({
      title: "PO Approved",
      message: `${pr.materialName} approved. Waiting for material receipt`,
      roleTarget: "admin",
      departmentTarget: "Account",
      type: "PO"
    });

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

router.get("/po-ready", protect, async (req, res) => {
  try {
    const list = await PurchaseRequest.find({
      status: "ADMIN_APPROVED"
    }).populate("createdBy", "name");

    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


/* =====================================================
SUPERADMIN REJECT PO
===================================================== */
router.put("/reject-po/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "superadmin")
      return res.sendStatus(403);

    const { reason } = req.body;

    const pr = await PurchaseRequest.findById(req.params.id);
    if (!pr) return res.status(404).json({ msg: "PO not found" });

    if (pr.status !== "PO_CREATED") {
      return res.status(400).json({ msg: "Cannot reject now" });
    }

    pr.status = "PO_REJECTED";
    pr.rejectionReason = reason || "Rejected by SuperAdmin";
    pr.superAdminApprovedBy = req.user.id;

    await pr.save();

    /* 🔔 Purchase Admin */
    await createNotification({
      title: "PO Rejected",
      message: `${pr.poNumber} rejected`,
      roleTarget: "admin",
      departmentTarget: "Purchase",
      type: "REJECT"
    });

    /* 🔔 Employee */
    await createNotification({
      title: "Request Rejected",
      message: `Your request for ${pr.materialName} rejected`,
      userTarget: pr.createdBy,
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "REJECT"
    });

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});



/* =====================================================
ACCOUNT → MARK PAYMENT
===================================================== */
router.put("/pay/:id", protect, async (req, res) => {
  try {
    if (req.user.department !== "Account")
      return res.sendStatus(403);

    const { receiptNo } = req.body;

    if (!receiptNo)
      return res.status(400).json({ msg: "Receipt number required" });

    const pr = await PurchaseRequest.findById(req.params.id);
    if (!pr) return res.status(404).json({ msg: "PO not found" });

    if (pr.status !== "PAYMENT_PENDING") {
      return res.status(400).json({ msg: "Already paid" });
    }

    /* ===== GET LOGGED ACCOUNT ADMIN ===== */
    const accountAdmin = await Admin.findById(req.user.id);
    if (!accountAdmin)
      return res.status(404).json({ msg: "Account admin not found" });

    const total = Number(pr.totalAmount || 0);

    /* ===== WALLET CHECK ===== */
    if ((accountAdmin.walletBalance || 0) < total) {
      return res.status(400).json({
        msg: `Wallet low. Need ₹${total}`
      });
    }

    /* ===== CUT WALLET ===== */
    accountAdmin.walletBalance =
      Number(accountAdmin.walletBalance || 0) - total;

    await accountAdmin.save();

    /* ===== SAVE PAYMENT DETAILS ===== */
    pr.paymentDetails.receiptNo = receiptNo;
    pr.paymentDetails.paymentDate = new Date();
    pr.paymentDetails.paidBy = accountAdmin._id;
    pr.paymentDetails.amount = total;

    pr.status = "PAYMENT_COMPLETED";
    pr.paymentDone = true;

    await pr.save();

    res.json({
      success: true,
      walletBalance: accountAdmin.walletBalance
    });

  } catch (err) {
    console.log("PAY ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});
router.get("/payment-pending", protect, async (req, res) => {
  if (req.user.department !== "Account")
    return res.sendStatus(403);

  const list = await PurchaseRequest.find({
    status: { $in: ["SUPERADMIN_APPROVED", "PAYMENT_PENDING"] }
  }).populate("vendor", "name");

  res.json(list);
});

/* =====================================================
   GET PENDING PR FOR PURCHASE ADMIN
===================================================== */
router.get("/pending/admin", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin" || req.user.department !== "Purchase") {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const prs = await PurchaseRequest.find({
      status: "PENDING_ADMIN"
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(prs);

  } catch (err) {
    console.log("ADMIN FETCH ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});

/* =====================================================
   ADMIN APPROVE PR
===================================================== */
router.put("/admin-approve/:id", protect, async (req, res) => {
  try {

    if (req.user.role !== "admin" || req.user.department !== "Purchase") {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const pr = await PurchaseRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ msg: "Purchase request not found" });
    }

    if (pr.status !== "PENDING_ADMIN") {
      return res.status(400).json({ msg: "Invalid PR status" });
    }

    pr.status = "ADMIN_APPROVED";
    pr.adminApprovedBy = req.user.id;

    await pr.save();

    /* 🔔 Notify SuperAdmin */
    await createNotification({
      title: "PR Approved by Admin",
      message: `PR for ${pr.materialName} needs SuperAdmin approval`,
      roleTarget: "superadmin",
      type: "APPROVAL"
    });

    /* 🔔 Notify Employee */
    await createNotification({
      title: "PR Approved",
      message: `Your request for ${pr.materialName} was approved by Admin`,
      userTarget: pr.createdBy,
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "INFO"
    });

    res.json({ success: true });

  } catch (err) {
    console.log("ADMIN APPROVE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});

/* =====================================================
   ADMIN REJECT PR
===================================================== */
router.put("/admin-reject/:id", protect, async (req, res) => {
  try {

    if (req.user.role !== "admin" || req.user.department !== "Purchase") {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const { reason } = req.body;

    const pr = await PurchaseRequest.findById(req.params.id);

    if (!pr) {
      return res.status(404).json({ msg: "Purchase request not found" });
    }

    if (pr.status !== "PENDING_ADMIN") {
      return res.status(400).json({ msg: "Invalid PR status" });
    }

    pr.status = "ADMIN_REJECTED";
    pr.rejectionReason = reason || "Rejected by Admin";

    await pr.save();

    /* 🔔 Notify Employee */
    await createNotification({
      title: "PR Rejected",
      message: `Your request for ${pr.materialName} was rejected.`,
      userTarget: pr.createdBy,
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "REJECT"
    });

    res.json({ success: true });

  } catch (err) {
    console.log("ADMIN REJECT ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});
router.get("/my", protect, async (req, res) => {
  try {
    /* only employee can see own PR */
    if (req.user.role !== "employee") {
      return res.status(403).json({ msg: "Only employee" });
    }

    const list = await PurchaseRequest.find({
      createdBy: req.user.id
    })
      .populate("vendor", "name") // optional
      .sort({ createdAt: -1 });

    res.json(list);

  } catch (err) {
    console.log("MY PR ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});



module.exports = router;

const express = require("express");
const router = express.Router();
const PurchaseRequest = require("../modal/PurchaseRequest");
const protect = require("../middleware/authmiddleware");
const calculateReceiptStatus = require("../utils/grnhelper");
const  createNotification  = require("../utils/CreateNotification");


/* GET PRs READY FOR RECEIVING */
router.get("/grn-pending", protect, async (req, res) => {
  const prs = await PurchaseRequest.find({
    status: { $in: ["PAYMENT_COMPLETED", "RECEIVING_IN_PROGRESS", "SUPERADMIN_APPROVED"] }
  });

  res.json(prs);
});

/* ADD NEW GRN (WORKS FOR FULL OR PARTIAL) */
router.post("/grn/:id", protect, async (req, res) => {
  try {
    let { receivedQty, damagedQty, remarks } = req.body;

    receivedQty = Number(receivedQty);
    damagedQty = Number(damagedQty || 0);

    if (!receivedQty || receivedQty <= 0) {
      return res.status(400).json({ msg: "receivedQty required" });
    }

    const pr = await PurchaseRequest.findById(req.params.id);
    if (!pr) return res.status(404).json({ msg: "PR not found" });

    if (!pr.quantityReceived) pr.quantityReceived = 0;

    const remaining = pr.quantity - pr.quantityReceived;

    /* 🚫 VALIDATION */
    if (receivedQty + damagedQty > remaining) {
      return res.status(400).json({
        msg: `Cannot receive more than remaining ${remaining}`
      });
    }

    /* 🟢 SAVE GRN */
    pr.grns.push({
      receivedQty,
      damagedQty,
      remarks,
      receivedBy: req.user.id,
      receivedDate: new Date()
    });

    pr.quantityReceived += receivedQty + damagedQty;

    let fullReceived = false;

    if (pr.quantityReceived >= pr.quantity) {
      pr.status = "RAW_MATERIAL_RECEIVED";
      fullReceived = true;
    } else {
      pr.status = "RECEIVING_IN_PROGRESS";
    }

    await pr.save();

    /* =====================================================
        🔔 NOTIFY EMPLOYEE (MOST IMPORTANT)
    ===================================================== */
    await createNotification({
      title: "Material Received",
      message: `${receivedQty} received for ${pr.materialName}`,
      userTarget: pr.createdBy,
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "GRN"
    });

    /* =====================================================
        🔔 NOTIFY PURCHASE ADMIN
    ===================================================== */
    await createNotification({
      title: "Material Received",
      message: `${receivedQty} received for ${pr.materialName}`,
      roleTarget: "admin",
      departmentTarget: "Purchase",
      type: "GRN"
    });

    /* =====================================================
        🔔 IF FULLY RECEIVED → SUPERADMIN
    ===================================================== */
    if (fullReceived) {
      await createNotification({
        title: "Material Fully Received",
        message: `${pr.materialName} fully received`,
        roleTarget: "superadmin",
        type: "GRN"
      });
    }

    res.json({ success: true, pr });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

router.get("/raw-materials", protect, async (req, res) => {
  try {
    // allow manufacturing admin + superadmin
    if (
      req.user.role !== "superadmin" &&
      req.user.department !== "Manufacturing"
    ) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const prs = await PurchaseRequest.find({
      quantityReceived: { $gt: 0 }
    }).sort({ updatedAt: -1 });

    res.json(prs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;

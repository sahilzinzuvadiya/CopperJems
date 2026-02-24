const express = require("express");
const router = express.Router();
const PurchaseRequest = require("../modal/PurchaseRequest");
const protect = require("../middleware/authmiddleware");
const calculateReceiptStatus = require("../utils/grnhelper");
const createNotification = require("../utils/CreateNotification");


/* GET PRs READY FOR RECEIVING */
router.get("/grn-pending", protect, async (req, res) => {
  try {
    const prs = await PurchaseRequest.find({
      status: {
        $in: [
          "SUPERADMIN_APPROVED",
          "RECEIVING_IN_PROGRESS",
          "PAYMENT_PENDING"
        ]
      }
    }).sort({ createdAt: -1 });

    res.json(prs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
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

    if (receivedQty + damagedQty > remaining) {
      return res.status(400).json({
        msg: `Cannot receive more than remaining ${remaining}`
      });
    }

    /* SAVE GRN */
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
      fullReceived = true;

      /* START CREDIT CYCLE */
      const due = new Date();
      due.setDate(due.getDate() + Number(pr.creditDays || 0));

      pr.dueDate = due;
      pr.status = "PAYMENT_PENDING";
    } else {
      pr.status = "RECEIVING_IN_PROGRESS";
    }

    await pr.save();

    /* NORMAL NOTIFICATIONS */
    await createNotification({
      title: "Material Received",
      message: `${receivedQty} received for ${pr.materialName}`,
      userTarget: pr.createdBy,
      roleTarget: "employee",
      departmentTarget: "Purchase",
      type: "GRN"
    });

    await createNotification({
      title: "Material Received",
      message: `${receivedQty} received for ${pr.materialName}`,
      roleTarget: "admin",
      departmentTarget: "Purchase",
      type: "GRN"
    });

    /* 🔥 FULL RECEIVED NOTIFICATIONS */
    if (fullReceived) {

      // superadmin
      await createNotification({
        title: "Material Fully Received",
        message: `${pr.materialName} fully received`,
        roleTarget: "superadmin",
        type: "GRN"
      });

      // ACCOUNT ADMIN (IMPORTANT)
      await createNotification({
        title: "Credit Cycle Started",
        message: `Credit cycle started for ${pr.materialName}. Payment due on ${pr.dueDate.toDateString()}`,
        roleTarget: "admin",
        departmentTarget: "Account",
        type: "PAYMENT"
      });

      // SUPERADMIN PAYMENT ALERT
      await createNotification({
        title: "Payment Scheduled",
        message: `${pr.materialName} payment scheduled on ${pr.dueDate.toDateString()}`,
        roleTarget: "superadmin",
        type: "PAYMENT"
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

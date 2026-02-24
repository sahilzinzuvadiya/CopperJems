const express = require("express");
const router = express.Router();

const {
  getApprovedCashPRs,
  markCashPaid,
  getPaymentHistory,
  createClient,
  createInvoice,
  getPendingInvoices,
  markPaid,
  getClients,
  getAllClients,
  updateClient,
  deleteClient,
  requestFunds,
  approveFunds,
  rejectFunds,
  getWalletBalance,
  getFundRequests,
  getPendingPayments,
  getReceivedPayments,
  getReminderInvoices
} = require("../controller/accountctl");
const PurchaseRequest = require("../modal/PurchaseRequest");

const protect = require("../middleware/authmiddleware");

router.get(
  "/cash-approved-prs",
  protect,

  getApprovedCashPRs
);

// router.post(
//   "/pay/:id",
//   protect,

//   markCashPaid
// );

router.get("/payment-history", getPaymentHistory);

router.post("/client", protect, createClient);
router.put("/client/:id", updateClient);
router.delete("/client/:id", deleteClient);
router.post("/invoice", protect, createInvoice);
router.get("/pending", protect, getPendingInvoices);
router.put("/paid/:id", protect, markPaid);
router.get("/clients", protect, getClients);
router.get("/all", protect, getAllClients);
/* ======================================================
   💰 ACCOUNT ADMIN → REQUEST FUNDS
====================================================== */
router.post(
  "/request-funds",
  protect,
  requestFunds
);

/* ======================================================
   👑 SUPERADMIN → APPROVE FUNDS
====================================================== */
router.post(
  "/approve-funds/:id",
  protect,
  approveFunds
);

router.post("/fund-reject/:id", protect, rejectFunds);

/* ======================================================
   💰 GET WALLET BALANCE (ACCOUNT ADMIN)
====================================================== */
router.get(
  "/wallet",
  protect,
  getWalletBalance
);

router.get(
  "/request-funds",
  protect,
  getFundRequests
);

router.get("/pending-payments", protect, getPendingPayments);

router.get("/payments-received", protect, getReceivedPayments);

router.get("/reminders", getReminderInvoices);

router.get("/ready-to-send-vendor", protect, async (req, res) => {
  if (req.user.department !== "Account")
    return res.sendStatus(403);

  const list = await PurchaseRequest.find({
    status: "SUPERADMIN_APPROVED",
    vendorMsgSent: false
  }).populate("vendor");

  res.json(list);
});

router.post("/send-vendor-msg/:id", protect, async (req, res) => {
  try {
    const pr = await PurchaseRequest.findById(req.params.id)
      .populate("vendor", "name phone");

    if (!pr) return res.status(404).json({ msg: "PO not found" });

    if (!pr.vendor?.phone)
      return res.status(400).json({ msg: "Vendor phone missing" });

    const phone = pr.vendor.phone.replace(/\D/g, "");

    const message = `
Hello ${pr.vendor.name},

Your order is confirmed.

PO: ${pr.poNumber}
Material: ${pr.materialName}
Qty: ${pr.quantity}
Rate: ₹${pr.finalRate}
Total: ₹${pr.totalAmount}

We will receive material soon.
Thank you.
`;

    const encoded = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${phone}?text=${encoded}`;

     pr.vendorMsgSent = true;
    await pr.save();

    res.json({
      success: true,
      url: whatsappUrl
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;

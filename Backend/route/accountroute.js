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

const protect  = require("../middleware/authmiddleware");

router.get(
  "/cash-approved-prs",
  protect,
  
  getApprovedCashPRs
);

router.post(
  "/cash-pay/:id",
  protect,
  
  markCashPaid
);

router.get("/payment-history", getPaymentHistory);

router.post("/client", protect,createClient);
router.put("/client/:id", updateClient);
router.delete("/client/:id", deleteClient);
router.post("/invoice",protect, createInvoice);
router.get("/pending",protect, getPendingInvoices);
router.put("/paid/:id",protect, markPaid);
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


module.exports = router;

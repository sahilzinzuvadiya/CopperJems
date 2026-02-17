const PurchaseRequest = require("../modal/PurchaseRequest");
const Client = require("../modal/Client");
const Invoice = require("../modal/Invoice");
const createNotification = require("../utils/CreateNotification");
const FundRequest = require("../modal/fundRequestSchema")
const Admin = require("../modal/admin")


/**
 * GET all SuperAdmin approved PRs (Cash)
 */
exports.getApprovedCashPRs = async (req, res) => {
  try {
    // console.log("ACCOUNT USER:", req.user);

    const prs = await PurchaseRequest.find({
      status: "SUPERADMIN_APPROVED",

    });

    // console.log("FOUND PRS:", prs);

    res.json(prs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.markCashPaid = async (req, res) => {
  try {
    const { receiptNo } = req.body;

    if (!receiptNo) {
      return res.status(400).json({ message: "Receipt number required" });
    }

    const pr = await PurchaseRequest.findById(req.params.id);
    if (!pr) {
      return res.status(404).json({ message: "PR not found" });
    }

    /* ===== FIND ACCOUNT ADMIN ===== */
    const accountAdmin = await Admin.findOne({
      department: "Account",
      role: "admin"
    });

    if (!accountAdmin) {
      return res.status(404).json({ message: "Account admin not found" });
    }

    /* ===== TOTAL PRICE ===== */
    const totalAmount = (pr.quantity || 0) * (pr.expectedPrice || 0);

    /* ❌ WALLET LOW → STOP PAYMENT */
    if (accountAdmin.walletBalance < totalAmount) {
      return res.status(400).json({
        message: `Wallet balance low. Need ₹${totalAmount}, available ₹${accountAdmin.walletBalance}`
      });
    }

    /* ===== CUT WALLET ===== */
    accountAdmin.walletBalance -= totalAmount;
    await accountAdmin.save();

    /* ===== SAVE PAYMENT ===== */
    pr.paymentDetails = {
      receiptNo,
      paymentDate: new Date(),
      paidBy: req.user.id
    };

    pr.status = "PAYMENT_COMPLETED";
    await pr.save();

    res.json({
      success: true,
      walletBalance: accountAdmin.walletBalance
    });

  } catch (err) {
    console.log("PAY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



// GET PAYMENT HISTORY (completed payments)
exports.getPaymentHistory = async (req, res) => {
  try {
    const prs = await PurchaseRequest.find({
      "paymentDetails.receiptNo": { $exists: true }
    })
      .populate("paymentDetails.paidBy", "name email")
      .sort({ "paymentDetails.paymentDate": -1 });

    res.json(prs);
  } catch (err) {
    console.error("Payment history error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// CREATE CLIENT
exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);

    // 🔔 SUPERADMIN NOTIFY
    await createNotification({
      title: "New Client Created",
      message: `${client.name} client added`,
      roleTarget: "superadmin",
      type: "CLIENT"
    });

    res.json(client);
  } catch (err) {
    console.log("CREATE CLIENT ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }

    // 🔔 SUPERADMIN NOTIFY
    await createNotification({
      title: "Client Updated",
      message: `${client.name} client details updated`,
      roleTarget: "superadmin",
      type: "CLIENT"
    });

    res.json(client);

  } catch (err) {
    console.log("UPDATE CLIENT ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }

    // 🔔 SUPERADMIN NOTIFY
    await createNotification({
      title: "Client Deleted",
      message: `${client.name} client removed`,
      roleTarget: "superadmin",
      type: "CLIENT"
    });

    res.json({ success: true, msg: "Client deleted" });

  } catch (err) {
    console.log("DELETE CLIENT ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};



// CREATE INVOICE (after product taken)
exports.createInvoice = async (req, res) => {
  try {
    const { clientId, wireType, qty, rate } = req.body;

    if (!clientId || !wireType || !qty || !rate) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }

    const total = Number(qty) * Number(rate);

    // due date from credit days
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (client.creditDays || 0));

    const invoiceNo = "INV" + Date.now();

    const invoice = await Invoice.create({
      client: clientId,
      wireType,
      qty: Number(qty),
      rate: Number(rate),
      total,
      invoiceNo,
      dueDate
    });

    /* 🔔 SUPERADMIN NOTIFICATION */
    await createNotification({
      title: "Invoice Created",
      message: `${invoice.invoiceNo} created for ${client.name} | ₹${total}`,
      roleTarget: "superadmin",
      type: "INVOICE"
    });

    // 🔗 invoice pdf url (if you generate pdf later)
    const invoiceUrl = `${process.env.BASE_URL}/invoice/${invoice._id}`;

    res.json({
      invoice,
      invoiceUrl,
      clientPhone: client.phone,
      clientName: client.name,
      total,
      invoiceNo
    });

  } catch (err) {
    console.log("INVOICE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};




// GET PENDING
exports.getPendingInvoices = async (req, res) => {
  const list = await Invoice.find({ paymentStatus: "PENDING" })
    .populate("client");

  res.json(list);
};

exports.getClients = async (req, res) => {
  const list = await Client.find();
  res.json(list);
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ name: 1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// MARK PAID
exports.markPaid = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);

  invoice.paymentStatus = "PAID";
  await invoice.save();

  res.json({ success: true });
};

exports.requestFunds = async (req, res) => {
  try {
    if (req.user.department !== "Account") {
      return res.status(403).json({ msg: "Only account admin can request" });
    }

    console.log("BODY:", req.body); 

    const { amount, purchaseRequestId } = req.body;

    const fund = await FundRequest.create({
      amount,
      purchaseRequest: purchaseRequestId,
      requestedBy: req.user.id
    });

    /* 🔔 SUPERADMIN */
    await createNotification({
      title: "Fund Request",
      message: `Account admin requested ₹${amount}`,
      roleTarget: "superadmin",
      type: "PAYMENT"
    });

    res.json(fund);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.approveFunds = async (req, res) => {
  try {
    const fund = await FundRequest.findById(req.params.id);
    if (!fund) return res.status(404).json({ msg: "Not found" });

    if (fund.status !== "PENDING") {
      return res.status(400).json({ msg: "Already processed" });
    }

    /* ===== UPDATE STATUS ===== */
    fund.status = "APPROVED";
    fund.approvedBy = "SUPERADMIN"; // ⭐ fixed value
    await fund.save();

    /* ===== FIND ACCOUNT ADMIN ===== */
    const accountAdmin = await Admin.findOne({
      department: "Account",
      role: "admin"
    });

    if (!accountAdmin) {
      return res.status(404).json({ msg: "Account admin not found" });
    }

    /* ===== ADD MONEY TO WALLET ===== */
    accountAdmin.walletBalance =
      (accountAdmin.walletBalance || 0) + fund.amount;

    await accountAdmin.save();

    /* ===== NOTIFICATION ===== */
    await createNotification({
      title: "Funds Added",
      message: `₹${fund.amount} added to wallet`,
      roleTarget: "admin",
      departmentTarget: "Account",
      userTarget: accountAdmin._id,
      type: "PAYMENT"
    });

    res.json({ success: true });

  } catch (err) {
    console.log("APPROVE FUND ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.rejectFunds = async (req, res) => {
  try {
    const fund = await FundRequest.findById(req.params.id);

    if (!fund) return res.status(404).json({ msg: "Not found" });

    if (fund.status !== "PENDING") {
      return res.status(400).json({ msg: "Already processed" });
    }

    fund.status = "REJECTED";
    fund.approvedBy = "SUPERADMIN";
    await fund.save();

    const accountAdmin = await Admin.findOne({
      department: "Account",
      role: "admin"
    });

    if (accountAdmin) {
      await createNotification({
        title: "Fund Request Rejected",
        message: `₹${fund.amount} request rejected`,
        roleTarget: "admin",
        departmentTarget: "Account",
        userTarget: accountAdmin._id,
        type: "PAYMENT"
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.log("REJECT FUND ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getWalletBalance = async (req, res) => {
  try {
    if (req.user.department !== "Account") {
      return res.status(403).json({ msg: "Not account admin" });
    }

    const admin = await Admin.findById(req.user.id);

    res.json({
      walletBalance: admin.walletBalance || 0
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.getFundRequests = async (req, res) => {
  try {
    const requests = await FundRequest.find()
      .populate("requestedBy", "name email")          // 👈 get name
      .populate("purchaseRequest")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.log("GET FUND REQUEST ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};


/* =====================================================
   GET PENDING PAYMENTS WITH FULL INFO
===================================================== */
exports.getPendingPayments = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      paymentStatus: { $ne: "PAID" }
    })
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    const data = invoices.map(inv => {
      const total =
        inv.totalAmount ||
        inv.total ||
        inv.amount ||
        0;

      return {
        _id: inv._id,
        clientName: inv.client?.name || "Unknown",
        clientEmail: inv.client?.email || "",
        wireType: inv.wireType || "-",
        qty: inv.qty || inv.quantity || 0,
        pendingAmount: total,   // ⭐ THIS FIELD
        createdAt: inv.createdAt
      };
    });

    res.json(data);
  } catch (err) {
    console.log("PENDING ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getReceivedPayments = async (req, res) => {
  try {
    const payments = await Invoice.find({
      paymentStatus: "PAID"
    })
      .populate("client", "name phone")
      .sort({ updatedAt: -1 });

    const totalAgg = await Invoice.aggregate([
      { $match: { paymentStatus: "PAID" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const totalReceived = totalAgg[0]?.total || 0;

    res.json({
      payments,
      totalReceived
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
};
exports.getReminderInvoices = async (req, res) => {
  const data = await Invoice.find({
    reminderReady: true,
    paymentStatus: "PENDING"
  }).populate("client");

  res.json(data);
};


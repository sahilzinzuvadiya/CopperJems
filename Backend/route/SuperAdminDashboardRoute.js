const router = require("express").Router();
const { getDashboardStats,getAnalytics } = require("../controller/SuperAdminDashboardctl");
const protect = require("../middleware/authmiddleware");
const Purchase = require("../modal/PurchaseRequest");
const Sale = require("../modal/Sale");
const Invoice = require("../modal/Invoice");
const Production = require("../modal/Producion");

router.get("/stats", getDashboardStats);
router.get("/analytics", protect ,getAnalytics);

router.get("/finance", protect, async (req, res) => {
  try {
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const lastStart = new Date(year, month - 2, 1);
    const lastEnd = new Date(year, month - 1, 1);

    /* =====================================================
       LOAD DATA
    ===================================================== */
    const purchases = await Purchase.find().lean();
    const productions = await Production.find().lean();
    const sales = await Sale.find().lean();

    /* =====================================================
       RAW MATERIAL REMAINING
       Remaining = quantityReceived - sum(rawQtyUsed from Production)
    ===================================================== */

    const rawReceived = {};
    const rawUsed = {};

    // Total received
    purchases.forEach(p => {
      const name = p.materialName;

      if (!rawReceived[name]) rawReceived[name] = 0;

      rawReceived[name] += Number(p.quantityReceived || 0);
    });

    // Total used in production
    productions.forEach(prod => {
      const name = prod.materialName;

      if (!rawUsed[name]) rawUsed[name] = 0;

      rawUsed[name] += Number(prod.rawQtyUsed || 0);
    });

    // Final remaining raw
    const rawTypes = {};

    Object.keys(rawReceived).forEach(name => {
      const received = rawReceived[name] || 0;
      const used = rawUsed[name] || 0;

      rawTypes[name] = received - used;
    });

    /* =====================================================
       WIRE STOCK
    ===================================================== */

    const wireMade = {};
    const wireSold = {};

    productions.forEach(p => {
      const type = p.wireType;

      if (!wireMade[type]) wireMade[type] = 0;

      wireMade[type] += Number(p.outputQty || 0);
    });

    sales.forEach(s => {
      const type = s.wireType;

      if (!wireSold[type]) wireSold[type] = 0;

      wireSold[type] += Number(s.qty || 0);
    });

    const readyStock = {};

    Object.keys(wireMade).forEach(type => {
      const made = wireMade[type] || 0;
      const sold = wireSold[type] || 0;

      readyStock[type] = made - sold;
    });

    /* =====================================================
       MONTH FINANCE
    ===================================================== */

    const purchasesMonth = purchases.filter(
      p => p.createdAt >= start && p.createdAt < end
    );

    const salesMonth = sales.filter(
      s => s.createdAt >= start && s.createdAt < end
    );

    const invoices = await Invoice.find({
      paymentStatus: "PAID",
      createdAt: { $gte: start, $lt: end }
    }).lean();

    const totalPurchase = purchasesMonth.reduce(
      (a, b) => a + (b.totalAmount || 0),
      0
    );

    const vendorPaid = purchasesMonth.reduce(
      (a, b) => a + (b.paymentDetails?.amount || 0),
      0
    );

    const totalSales = salesMonth.reduce(
      (a, b) => a + (b.totalAmount || 0),
      0
    );

    const clientReceived = invoices.reduce(
      (a, b) => a + (b.total || 0),
      0
    );

    /* =====================================================
       LAST MONTH SALES (FOR GROWTH)
    ===================================================== */

    const lastMonthSales = sales
      .filter(s => s.createdAt >= lastStart && s.createdAt < lastEnd)
      .reduce((a, b) => a + (b.totalAmount || 0), 0);

    /* =====================================================
       RESPONSE
    ===================================================== */

    res.json({
      purchase: totalPurchase,
      sales: totalSales,
      vendorPaid,
      clientReceived,
      lastMonthSales,
      rawTypes,
      readyStock
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Finance error" });
  }
});

module.exports = router;

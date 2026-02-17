const Admin = require("../modal/admin");
const Employee = require("../modal/employee");
const Client = require("../modal/Client");
const Purchase = require("../modal/PurchaseRequest");
const Sale = require("../modal/Sale");
const Invoice = require("../modal/Invoice");

/* =========================================================
   DASHBOARD STATS + TYPE DATA
========================================================= */
exports.getDashboardStats = async (req, res) => {
  try {
    /* BASIC */
    const admins = await Admin.countDocuments();
    const employees = await Employee.countDocuments();
    const clients = await Client.countDocuments();

    /* =====================================================
       RAW MATERIAL TYPE WISE
       materialName field used
    ===================================================== */
    const rawTypeData = await Purchase.aggregate([
      {
        $group: {
          _id: "$materialName",
          qty: { $sum: "$quantity" }
        }
      }
    ]);

    const rawMaterials = rawTypeData.map(r => ({
      type: r._id,
      qty: r.qty
    }));

    /* =====================================================
       RAW MATERIAL AVAILABLE TOTAL
    ===================================================== */
    const rawTotal = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" }
        }
      }
    ]);

    const rawAvailable = rawTotal[0]?.total || 0;

    /* =====================================================
       SALES WIRE TYPE WISE
       wireType field in Sale model
    ===================================================== */
    const salesTypeData = await Sale.aggregate([
      {
        $group: {
          _id: "$wireType",
          qty: { $sum: "$qty" }
        }
      }
    ]);

    const wireSales = salesTypeData.map(s => ({
      type: s._id,
      qty: s.qty
    }));

    /* =====================================================
       ACCOUNT WALLET
    ===================================================== */
    const accountAdmin = await Admin.findOne({
      department: "Account",
      role: "admin"
    });

    const walletBalance = accountAdmin?.walletBalance || 0;

    /* =====================================================
       PENDING CLIENT PAYMENTS
    ===================================================== */
    const pendingAgg = await Invoice.aggregate([
      { $match: { paymentStatus: "PENDING" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const pendingPayments = pendingAgg[0]?.total || 0;

    res.json({
      admins,
      employees,
      clients,
      rawAvailable,
      walletBalance,
      pendingPayments,
      rawMaterials,   // ⭐ TYPE WISE
      wireSales       // ⭐ TYPE WISE
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Dashboard error" });
  }
};
exports.getAnalytics = async (req, res) => {
  try {

    /* WALLET */
    const accountAdmin = await Admin.findOne({
      department: "Account",
      role: "admin"
    });

    const walletBalance = accountAdmin?.walletBalance || 0;

    /* PENDING PAYMENTS */
    const pendingAgg = await Invoice.aggregate([
      { $match: { paymentStatus: "PENDING" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const pendingClientPayments = pendingAgg[0]?.total || 0;

    /* RECEIVED PAYMENTS (ALL TIME) */
    const receivedAgg = await Invoice.aggregate([
      { $match: { paymentStatus: "PAID" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const totalReceivedPayments = receivedAgg[0]?.total || 0;


    /* MONTHLY PURCHASE */
    const purchaseData = await Purchase.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: {
            $sum: { $multiply: ["$quantity", "$expectedPrice"] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    /* MONTHLY SALES */
    const salesData = await Sale.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: {
            $sum: {
              $cond: [
                { $gt: ["$totalAmount", 0] },
                "$totalAmount",
                { $multiply: ["$qty", "$rate"] }
              ]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const purchases = purchaseData.map(p => ({
      month: months[p._id - 1],
      total: p.total
    }));

    const sales = salesData.map(s => ({
      month: months[s._id - 1],
      total: s.total
    }));

    /* TOTAL PURCHASE */
    const totalPurchaseAgg = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: { $multiply: ["$quantity", "$expectedPrice"] }
          }
        }
      }
    ]);

    const totalPurchase = totalPurchaseAgg[0]?.total || 0;

    /* TOTAL SALES */
    const totalSalesAgg = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $cond: [
                { $gt: ["$totalAmount", 0] },
                "$totalAmount",
                { $multiply: ["$qty", "$rate"] }
              ]
            }
          }
        }
      }
    ]);

    const totalSales = totalSalesAgg[0]?.total || 0;

    /* RAW MATERIAL TYPES */
    const rawAgg = await Purchase.aggregate([
      {
        $group: {
          _id: "$materialName",
          qty: { $sum: "$quantity" }
        }
      }
    ]);

    const rawMaterials = rawAgg.map(r => ({
      type: r._id,
      qty: r.qty
    }));

    /* WIRE TYPES */
    const wireAgg = await Sale.aggregate([
      {
        $group: {
          _id: "$wireType",
          qty: { $sum: "$qty" }
        }
      }
    ]);

    const wires = wireAgg.map(w => ({
      type: w._id,
      qty: w.qty
    }));

    res.json({
      walletBalance,
      pendingClientPayments,
      totalReceivedPayments,
      purchases,
      sales,
      summary: {
        totalPurchase,
        totalSales
      },
      rawMaterials,
      wires
    });

  } catch (err) {
    console.log("ANALYTICS ERROR:", err);
    res.status(500).json({ msg: "Analytics error" });
  }
};


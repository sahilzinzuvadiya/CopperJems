const PurchaseRequest = require("../modal/PurchaseRequest");
const Sale = require("../modal/Sale");
const Production = require("../modal/Producion");
const Employee = require("../modal/employee");
const Invoice = require("../modal/Invoice");

exports.getAdminDashboard = async (req, res) => {
  try {
    const dept = req.user.department;

    /* ================= PURCHASE ================= */
    if (dept === "Purchase") {

      const totalPurchaseAgg = await PurchaseRequest.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: { $multiply: ["$expectedPrice", "$quantity"] } }
          }
        }
      ]);

      const totalPurchase = totalPurchaseAgg[0]?.total || 0;

      const pendingPR = await PurchaseRequest.countDocuments({
        status: "PENDING_ADMIN"
      });

      const employees = await Employee.countDocuments({
        department: "Purchase"
      });

      const monthlyAgg = await PurchaseRequest.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: { $multiply: ["$expectedPrice", "$quantity"] } }
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      const monthly = monthlyAgg.map(m => ({
        month: months[m._id - 1],
        total: m.total
      }));

      return res.json({
        type: "Purchase",
        totalPurchase,
        pendingPR,
        employees,
        monthly
      });
    }

    /* ================= SALES ================= */
    if (dept === "Sales") {

      // total ₹ sales
      const totalSalesAgg = await Sale.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ]);

      const totalSales = totalSalesAgg[0]?.total || 0;

      // total orders
      const totalOrders = await Sale.countDocuments();

      const employees = await Employee.countDocuments({
        department: "Sales"
      });

      // 🔥 monthly SALES ₹ (not orders)
      const monthlyAgg = await Sale.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: "$totalAmount" }   // 🔥 FIX
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      const monthly = monthlyAgg.map(m => ({
        month: months[m._id - 1],
        total: m.total
      }));

      return res.json({
        type: "Sales",
        totalSales,
        totalOrders,
        employees,
        monthly
      });
    }

    /* ================= MANUFACTURING ================= */
    if (dept === "Manufacturing") {

      const totalProduction = await Production.countDocuments({
        status: "COMPLETED"
      });

      const pending = await Production.countDocuments({
        status: { $ne: "COMPLETED" }
      });

      const employees = await Employee.countDocuments({
        department: "Manufacturing"
      });

      const wireTypeAgg = await Production.aggregate([
        { $match: { status: "COMPLETED" } },
        {
          $group: {
            _id: "$wireType",
            qty: { $sum: "$outputQty" }
          }
        },
        {
          $project: {
            wireType: "$_id",
            qty: 1,
            _id: 0
          }
        }
      ]);

      return res.json({
        type: "Manufacturing",
        totalProduction,
        pending,
        employees,
        wireTypeStats: wireTypeAgg
      });
    }

    /* ================= ACCOUNT ================= */
    if (dept === "Account") {

      const totalSalesAgg = await Sale.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ]);

      const revenue = totalSalesAgg[0]?.total || 0;

      const pendingPayments = await Invoice.countDocuments({
        paymentStatus: "PENDING"
      });

      const employees = await Employee.countDocuments({
        department: "Account"
      });

      // 🔥 monthly revenue (not pending)
      const monthlyAgg = await Sale.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: "$totalAmount" }
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      const monthly = monthlyAgg.map(m => ({
        month: months[m._id - 1],
        total: m.total
      }));

      return res.json({
        type: "Account",
        revenue,
        pendingPayments,
        employees,
        monthly
      });
    }

    res.status(400).json({ msg: "Unknown department" });

  } catch (err) {
    console.log("Dashboard error:", err);
    res.status(500).json({ msg: "Dashboard error" });
  }
};


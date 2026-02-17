const PurchaseRequest = require("../modal/PurchaseRequest");
const Sale = require("../modal/Sale");
const Production = require("../modal/Producion");
const Employee = require("../modal/employee");

const mongoose = require("mongoose");

exports.getEmployeeDashboard = async (req, res) => {
  try {
    const dept = req.user.department;
     const userId = new mongoose.Types.ObjectId(req.user.id);

    /* =====================================================
        PURCHASE EMPLOYEE
    ===================================================== */
if (dept === "Purchase") {

  const total = await PurchaseRequest.countDocuments({
    createdBy: userId
  });

  const pending = await PurchaseRequest.countDocuments({
    createdBy: userId,
    status: "PENDING_ADMIN"
  });

  const receiving = await PurchaseRequest.countDocuments({
    createdBy: userId,
    status: "RECEIVING_IN_PROGRESS"
  });

  /* ===== MONTHLY ===== */
  const monthlyAgg = await PurchaseRequest.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: "$quantity" }
      }
    }
  ]);

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthly = months.map((m, i) => {
    const found = monthlyAgg.find(x => x._id === i + 1);
    return {
      month: m,
      total: found ? found.total : 0
    };
  });

  return res.json({
    type: "Purchase",
    total,
    pending,
    receiving,
    monthly
  });
}



    /* =====================================================
        SALES EMPLOYEE
    ===================================================== */
    if (dept === "Sales") {

      const mySalesAgg = await Sale.aggregate([
        { $match: { soldBy: userId } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ]);

      const totalSales = mySalesAgg[0]?.total || 0;

      const orders = await Sale.countDocuments({
        soldBy: userId
      });

      const monthlyAgg = await Sale.aggregate([
        { $match: { soldBy: userId } },
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
        type: "Sales",
        totalSales,
        orders,
        monthly
      });
    }

    /* =====================================================
        MANUFACTURING EMPLOYEE
    ===================================================== */
   if (dept === "Manufacturing") {

      /* ===== COMPLETED ===== */
      const completed = await Production.countDocuments({
        completedBy: userId,
        status: "COMPLETED"
      });

      /* ===== PENDING ===== */
     const pending = await Production.countDocuments({
  $or: [
    { completedBy: userId },
    { completedBy: null }
  ],
  status: { $ne: "COMPLETED" }
});


      /* ===== MONTHLY COMPLETED ===== */
      const monthlyAgg = await Production.aggregate([
        {
          $match: {
            completedBy: userId,
            status: "COMPLETED",
            completedAt: { $ne: null }
          }
        },
        {
          $group: {
            _id: { $month: "$completedAt" },
            total: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const monthly = monthlyAgg.map(m => ({
        month: months[m._id - 1],
        total: m.total
      }));

      return res.json({
        type: "Manufacturing",
        completed,
        pending,
        monthly
      });
    }

    res.status(400).json({ msg: "Unknown department" });

  

    /* =====================================================
        ACCOUNT EMPLOYEE
    ===================================================== */
    if (dept === "Account") {

      const invoices = await Sale.countDocuments({
        paymentStatus: "PENDING"
      });

      const monthlyAgg = await Sale.aggregate([
        { $match: { paymentStatus: "PENDING" } },
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
        invoices,
        monthly
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Employee dashboard error" });
  }
};

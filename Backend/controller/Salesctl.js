const FinishedGoods = require("../modal/FinishGoods");
const Sale = require("../modal/Sale");
const createNotification = require("../utils/CreateNotification");

exports.getPendingStock = async (req, res) => {
  const items = await FinishedGoods.find({
    status: "PENDING_SALES_APPROVAL"
  });

  res.json(items);
};

exports.approveStock = async (req, res) => {
  try {
    const item = await FinishedGoods.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    item.status = "READY_FOR_SALE";
    await item.save();

    /* 🔔 SALES EMPLOYEES */
    await createNotification({
      title: `${item.wireType} Ready for Sale`,
      message: `${item.totalQty} qty is now available for selling`,
      roleTarget: "employee",          // role must match DB
      departmentTarget: "Sales",       // department must match DB
      type: "STOCK"
    });

 

    /* 🔔 SUPERADMIN (optional) */
    await createNotification({
      title: "Stock Ready",
      message: `${item.wireType} ready for sale`,
      roleTarget: "superadmin",
      type: "STOCK"
    });

    res.json({ success: true });

  } catch (err) {
    console.log("APPROVE STOCK ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getSaleStock = async (req, res) => {
  const items = await FinishedGoods.find({
    status: "READY_FOR_SALE"
  });

  const result = items.map(i => ({
    ...i.toObject(),
    availableQty: i.totalQty - i.soldQty
  }));

  res.json(result);
};

// exports.sellProduct = async (req, res) => {

//   try {
//     const { id, qty, clientId, ratePerTon } = req.body;

//     const item = await FinishedGoods.findById(id);
//     if (!item) return res.status(404).json({ msg: "Stock not found" });

//     const available = item.totalQty - item.soldQty;

//     if (Number(qty) > available) {
//       return res.status(400).json({ msg: "Not enough stock" });
//     }

//     // update stock
//     item.soldQty += Number(qty);
//     await item.save();

//     // check auth user
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ msg: "User missing in request" });
//     }

//     // 🔥 calculate total
//     const totalAmount = Number(qty) * Number(ratePerTon);

//     await Sale.create({
//       wireType: item.wireType,
//       qty: Number(qty),
//       ratePerTon: Number(ratePerTon),
//       totalAmount: totalAmount,
//       soldBy: req.user.id,
//       client: clientId,
//       finishedGoodsId: item._id
//     });

//     res.json({ success: true });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: err.message });
//   }
// };
exports.sellProduct = async (req, res) => {
  try {
    const { id, qty, clientId, ratePerTon } = req.body;

    if (!id) return res.status(400).json({ msg: "Stock id missing" });

    const qtyNum = Number(qty);
    const rateNum = Number(ratePerTon);

    if (!qtyNum || qtyNum <= 0) {
      return res.status(400).json({ msg: "Invalid qty" });
    }

    if (!rateNum || rateNum <= 0) {
      return res.status(400).json({ msg: "Invalid rate" });
    }

    const item = await FinishedGoods.findById(id);
    if (!item) return res.status(404).json({ msg: "Stock not found" });

    // ensure soldQty exists
    if (!item.soldQty) item.soldQty = 0;

    const available = item.totalQty - item.soldQty;

    if (qtyNum > available) {
      return res.status(400).json({ msg: "Not enough stock" });
    }

    // update stock
    item.soldQty += qtyNum;
    await item.save();

    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User missing in request" });
    }

    const totalAmount = qtyNum * rateNum;

    await Sale.create({
      wireType: item.wireType,
      qty: qtyNum,
      ratePerTon: rateNum,
      totalAmount,
      soldBy: req.user.id,
      client: clientId,
      finishedGoodsId: item._id
    });

    /* 🔔 SALES ADMIN */
    await createNotification({
      title: "Product Sold",
      message: `${qtyNum} qty of ${item.wireType} sold`,
      roleTarget: "admin",
      departmentTarget: "Sales",
      type: "SALE"
    });

    /* 🔔 ACCOUNTS TEAM */
    await createNotification({
      title: "New Sale Entry",
      message: `Invoice needed for ${qtyNum} qty of ${item.wireType}`,
      roleTarget: "admin",
      departmentTarget: "Account",   // 🔥 must match DB exactly
      type: "SALE"
    });

    /* 🔔 SUPERADMIN */
    await createNotification({
      title: "Sale Completed",
      message: `${qtyNum} qty of ${item.wireType} sold. Amount ₹${totalAmount}`,
      roleTarget: "superadmin",
      type: "SALE"
    });

    res.json({ success: true });

  } catch (err) {
    console.log("SELL ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};





exports.getSalesHistory = async (req, res) => {
  const list = await Sale.find()
    .populate("soldBy", "name email")
    .populate("client", "name phone")


    .sort({ createdAt: -1 });

  res.json(list);
};



const Production = require("../modal/Producion");
const PurchaseRequest = require("../modal/PurchaseRequest");
const FinishedGoods = require("../modal/FinishGoods");
const createNotification = require("../utils/CreateNotification");


// 🟢 Create production plan (admin)
exports.createProduction = async (req, res) => {
  try {
    const { prId, wireType } = req.body;
    const rawQtyUsed = Number(req.body.rawQtyUsed);

    if (!prId) {
      return res.status(400).json({ msg: "prId missing" });
    }

    const pr = await PurchaseRequest.findById(prId);
    if (!pr) return res.status(404).json({ msg: "PR not found" });

    /* UPDATE USED */
    pr.productionUsed = (pr.productionUsed || 0) + rawQtyUsed;
    await pr.save();

    await Production.create({
      prId,
      materialName: pr.materialName,
      wireType,
      rawQtyUsed
    });

    /* 🔔 MANUFACTURING EMPLOYEES */
    await createNotification({
      title: "Production Started",
      message: `${rawQtyUsed} qty of ${pr.materialName} sent to production`,
      roleTarget: "employee",
      departmentTarget: "Manufacturing",
      type: "PRODUCTION"
    });

    /* 🔔 SUPERADMIN */
    await createNotification({
      title: "Production Created",
      message: `${rawQtyUsed} qty of ${pr.materialName} used`,
      roleTarget: "superadmin",
      type: "PRODUCTION"
    });

    res.json({ success: true });

  } catch (err) {
    console.log("PRODUCTION ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

// 🟢 Employee: start work
exports.startProduction = async (req, res) => {
  try {
    const prod = await Production.findById(req.params.id);
    if (!prod) {
      return res.status(404).json({ msg: "Production not found" });
    }

    prod.status = "IN_PROGRESS";
    await prod.save();

    const rawQtyUsed = prod.rawQtyUsed;
    const materialName = prod.materialName;

    /* 🔔 MANUFACTURING EMPLOYEES */
    await createNotification({
      title: "Production Started",
      message: `${rawQtyUsed} qty of ${materialName} sent to production`,
      roleTarget: "admin",
      departmentTarget: "Manufacturing",
      type: "PRODUCTION"
    });

    /* 🔔 SUPERADMIN */
    await createNotification({
      title: "Production Started",
      message: `${rawQtyUsed} qty of ${materialName} used`,
      roleTarget: "superadmin",
      type: "PRODUCTION"
    });

    res.json({ success: true });

  } catch (err) {
    console.log("START PRODUCTION ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};



// 🟢 Employee: complete work
exports.completeProduction = async (req, res) => {
  console.log("USER:", req.user);

  try {
    const { id } = req.params;
    const outputQty = Number(req.body.outputQty);

    const prod = await Production.findById(id);
    if (!prod) {
      return res.status(404).json({ msg: "Production not found" });
    }

    prod.status = "COMPLETED";
    prod.outputQty = outputQty;
    prod.completedAt = new Date();
    prod.completedBy = req.user?.id || req.user?._id;

    await prod.save();

    // ⭐ CREATE FINISHED GOODS
    await FinishedGoods.create({
      wireType: prod.wireType,
      totalQty: outputQty,
      productionId: prod._id
    });

    /* 🔔 ADMIN NOTIFICATION */
    await createNotification({
      title: "Production Completed",
      message: `${outputQty} qty of ${prod.materialName || prod.wireType} completed`,
      roleTarget: "admin",   
      departmentTarget: "Manufacturing",       // make sure role matches DB exactly
      type: "PRODUCTION"
    });

   await createNotification({
  title: `${prod.wireType} Ready for Sale`,
  message: `${outputQty} qty of ${prod.materialName || prod.wireType} is ready for selling`,
  roleTarget: "admin",          // must match DB role exactly
  departmentTarget: "Sales",    // must match DB department exactly
  type: "PRODUCTION"
});


    /* 🔔 SUPERADMIN NOTIFICATION */
    await createNotification({
      title: "Production Completed",
      message: `${outputQty} qty of ${prod.materialName || prod.wireType} completed`,
      roleTarget: "superadmin",     // match DB role exactly
      type: "PRODUCTION"
    });

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};



exports.getCompletedProduction = async (req, res) => {
  try {
    const list = await Production.find({
      status: "COMPLETED"
    })
      .populate("completedBy", "name")
      .sort({ completedAt: -1 });

    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// 🟢 Get all production tasks
exports.getAllProduction = async (req, res) => {
  try {
    const list = await Production
      .find()
      .populate("prId")
      .sort({ createdAt: -1 });

    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// GET materials ready for production
exports.getProductionReady = async (req, res) => {
  try {
    const prs = await PurchaseRequest.find().lean();

    const result = prs.map(p => {
      const received =
        (p.grns || []).reduce((sum, g) => sum + (g.receivedQty || 0), 0);

      const used = p.productionUsed || 0;

      return {
        ...p,
        receivedQty: received,
        remainingForProduction: received - used
      };
    })
      .filter(p => p.remainingForProduction > 0);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

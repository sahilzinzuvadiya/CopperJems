const Invoice = require("../modal/Invoice");
const Client = require("../modal/Client");


exports.generateInvoice = async (req, res) => {
  try {
    const { clientId, wireType, qty, rate, creditDays } = req.body;

    const total = Number(qty) * Number(rate);

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(creditDays));

    const invoiceNo = "INV-" + Date.now();

    // create invoice
    const invoice = await Invoice.create({
      client: clientId,
      wireType,
      qty,
      rate,
      total,
      invoiceNo,
      dueDate
    });

    // get client
    const client = await Client.findById(clientId);

    const msg = `📄 Invoice Generated
Invoice: ${invoiceNo}
Client: ${client.name}
Qty: ${qty}
Amount: ₹${total}
Due: ${dueDate.toDateString()}`;

    // send to CLIENT
    if (client?.phone) {
      await sendWhatsApp(client.phone, msg);
    }

    // send to ACCOUNT ADMIN
    const adminPhone = "91XXXXXXXXXX"; // put admin number
    await sendWhatsApp(adminPhone, msg);

    res.json({ success: true, invoice });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

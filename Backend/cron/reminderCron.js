const cron = require("node-cron");
const Invoice = require("../modal/Invoice");

cron.schedule("0 9 * * *", async () => {
  console.log("Checking reminders...");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const start = new Date(tomorrow.setHours(0,0,0,0));
  const end = new Date(tomorrow.setHours(23,59,59,999));

  await Invoice.updateMany(
    {
      dueDate: { $gte: start, $lte: end },
      paymentStatus: "PENDING"
    },
    { reminderReady: true }
  );

});

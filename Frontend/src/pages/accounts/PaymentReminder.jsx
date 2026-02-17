import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FaBell,
  FaWhatsapp,
  FaUser,
  FaRupeeSign,
  FaFileInvoice
} from "react-icons/fa";

export default function PaymentReminder() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get("/account/reminders");
    setList(res.data);
  };

  const send = (i) => {
    const phone = i.client.phone;

    const msg = `*CopperJems Pvt Ltd*

Dear ${i.client.name},

This is a friendly reminder that your payment is due tomorrow.

*Invoice No:* ${i.invoiceNo}
*Amount Due:* ₹${i.total.toLocaleString()}

Kindly arrange payment on time to avoid delay.

Thank you,
CopperJems Accounts Team`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    );
  };

  return (
    <div className="p-4 md:p-2">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <FaBell className="text-white text-lg" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Payment Reminders</h1>
          <p className="text-sm text-gray-500">
            Payments due tomorrow
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {list.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No reminders today
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-6">

        {list.map((i, index) => (
          <motion.div
            key={i._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 relative"
          >

            {/* BADGE */}
            <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold">
              Due Tomorrow
            </span>

            {/* CLIENT */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaUser className="text-indigo-600" />
              </div>

              <div>
                <p className="text-xs text-gray-400">Client</p>
                <p className="font-semibold text-lg">
                  {i.client.name}
                </p>
              </div>
            </div>

            {/* INVOICE */}
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaFileInvoice className="text-blue-600" />
              </div>

              <div>
                <p className="text-xs text-gray-400">Invoice</p>
                <p className="font-semibold">
                  {i.invoiceNo}
                </p>
              </div>
            </div>

            {/* AMOUNT */}
            <div className="bg-slate-50 rounded-xl p-4 text-center mt-4">
              <p className="text-xs text-gray-500">Amount Due</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1 flex items-center justify-center gap-1">
                <FaRupeeSign />
                {Number(i.total).toLocaleString()}
              </p>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => send(i)}
              className="
                mt-5 w-full bg-green-600 hover:bg-green-700
                text-white py-3 rounded-xl flex items-center justify-center gap-2
                font-medium shadow
              "
            >
              <FaWhatsapp />
              Send WhatsApp Reminder
            </button>

          </motion.div>
        ))}

      </div>
    </div>
  );
}

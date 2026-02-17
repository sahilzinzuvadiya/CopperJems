import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FaRupeeSign,
  FaUser,
  FaBoxOpen,
  FaClock
} from "react-icons/fa";

export default function PendingPayments() {
  const [data, setData] = useState([]);
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axios.get("/account/pending-payments");
      const list = res.data || [];
      setData(list);

      const total = list.reduce(
        (sum, x) => sum + Number(x.pendingAmount || 0),
        0
      );
      setTotalPending(total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 md:p-2 space-y-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
            <FaClock className="text-white" />
          </div>

          <div>
            <h1 className="text-xl md:text-[17px] lg:text-2xl sm:text-2xl font-bold">
              Pending Client Payments
            </h1>
            <p className="text-sm text-gray-500">
              Unpaid invoices
            </p>
          </div>
        </div>

        {/* TOTAL */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-0 w-fit">
          <FaRupeeSign />
           {totalPending.toLocaleString()}
        </div>
      </div>

      {/* EMPTY */}
      {data.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          No pending payments
        </p>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* DESKTOP HEADER */}
        <div className="hidden md:grid grid-cols-4 px-6 py-4 bg-gray-50 text-sm font-semibold text-gray-600">
          <div>Client</div>
          <div>Wire</div>
          <div>Qty</div>
          <div className="text-right">Pending</div>
        </div>

        {/* ROWS */}
        {data.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}

            className="
              border-b last:border-0
              px-4 py-4
              grid grid-cols-1
              md:grid-cols-4
              gap-3 md:gap-0
              items-center
              hover:bg-gray-50
            "
          >
            {/* CLIENT */}
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <FaUser className="text-red-600" />
              </div>
              <div className="font-medium">
                {p.clientName || "-"}
              </div>
            </div>

            {/* WIRE */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaBoxOpen />
              {p.wireType || "-"}
            </div>

            {/* QTY */}
            <div className="font-medium">
              Qty: {p.qty || 0}
            </div>

            {/* AMOUNT */}
            <div className="flex md:justify-end items-center gap-1 font-bold text-red-600">
              <FaRupeeSign />
              {Number(p.pendingAmount || 0).toLocaleString()}
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaMoneyBillWave,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaBoxOpen
} from "react-icons/fa";

export default function AccountsPending() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
    }, 1000); // update every second

    return () => clearInterval(timer);
  }, []);



  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/account/pending");
      setList(res.data);
    } catch {
      toast.error("Failed to load payments");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const paid = async (id) => {
    try {
      await axios.put("/account/paid/" + id);
      toast.success("Payment marked as paid");
      load();
    } catch {
      toast.error("Action failed");
    }
  };

  const getCountdown = (dueDate) => {
    if (!dueDate) return null;

    const now = new Date();
    const diff = new Date(dueDate) - now;

    if (diff <= 0) {
      return { text: "Overdue", type: "late" };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    return {
      text: `${days}d ${hours}h ${mins}m ${secs}s left`,
      type: "ok"
    };
  };



  return (
    <div className="min-h-screen p-4 md:p-2">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow">
          <FaMoneyBillWave className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Pending Payments
          </h1>
          <p className="text-sm text-slate-500">
            Outstanding client balances
          </p>
        </div>
      </div>

      {loading && (
        <p className="text-center text-gray-500 mt-10">Loading...</p>
      )}

      {!loading && list.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No pending payments
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-6">
        {list.map((i, index) => (
          <motion.div
            key={i._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500 relative"
          >
            {/* STATUS BADGE */}
            <span className="absolute top-4 right-4 text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <FaClock />
              Pending
            </span>

            

            {/* CLIENT */}
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <FaUser className="text-indigo-500" />
              {i.client?.name}
            </h3>

               {/* PRODUCT */}
            <p className="text-sm mt-3 flex items-center gap-2 text-slate-600">
              <FaBoxOpen className="text-blue-500" />
              {i.wireType} Wire
            </p>


            {/* LIVE TIMER */}
            {(() => {
              const cd = getCountdown(i.dueDate);
              return cd ? (
                <div className="mt-3">
                  <div
                    className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full
          text-xs font-semibold shadow-sm
          ${cd.type === "ok" && "bg-blue-50 text-blue-700"}
          ${cd.type === "late" && "bg-red-50 text-red-700"}
        `}
                  >
                    <span className="text-sm">⏳</span>
                    <span className="tracking-wide font-medium">
                      {cd.text}
                    </span>
                  </div>
                </div>
              ) : null;
            })()}

         

            {/* AMOUNT */}
            <div className="mt-5 bg-slate-50 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-500">Amount Due</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                ₹ {Number(i.total).toLocaleString()}
              </p>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => paid(i._id)}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow"
            >
              <FaCheckCircle />
              Mark as Paid
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

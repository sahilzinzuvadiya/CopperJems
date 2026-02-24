import { useEffect, useState } from "react";
import axios from "../../api/axios";
import StatusBadge from "../../components/StatusBadge";
import {
  FaCheckCircle,
  FaRupeeSign,
  FaClock,
  FaWallet
} from "react-icons/fa";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountsPayment() {

  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPR, setSelectedPR] = useState(null);
  const [receiptNo, setReceiptNo] = useState("");
  const [paying, setPaying] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [, forceUpdate] = useState(0);
  const [dueTodayList, setDueTodayList] = useState([]);
  const [showDuePopup, setShowDuePopup] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      forceUpdate(n => n + 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetchPRs();
    fetchWallet();
  }, []);

  const fetchPRs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/purchase/payment-pending");
      setPRs(res.data);


      // 🔔 CHECK DUE TODAY
      const today = new Date().getTime();

      const dueList = res.data.filter(p => {
        if (p.status !== "PAYMENT_PENDING" || !p.dueDate) return false;

        const due = new Date(p.dueDate).getTime();
        return due <= today;
      });

      if (dueList.length > 0) {
        setDueTodayList(dueList);
        setShowDuePopup(true);
      }
    } catch {
      toast.error("Failed to load payments");
    }
    setLoading(false);
  };

  const fetchWallet = async () => {
    try {
      const res = await axios.get("/account/wallet");
      setWallet(res.data.walletBalance || 0);
    } catch { }
  };

  const confirmPayment = async () => {
    if (!receiptNo.trim()) {
      toast.info("Receipt number required");
      return;
    }

    const total = selectedPR.totalAmount || 0;

    if (wallet < total) {
      toast.error("Insufficient wallet balance");
      return;
    }

    setPaying(true);
    try {
      const res = await axios.put(
        `/purchase/pay/${selectedPR._id}`,
        { receiptNo }
      );

      setPRs(prev => prev.filter(p => p._id !== selectedPR._id));
      setSelectedPR(null);
      setReceiptNo("");
      setWallet(res.data.walletBalance);

      toast.success("Payment Completed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
    setPaying(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-4 md:p-2">

      <div className="mb-8 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
          <FaWallet className="text-white text-lg" />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            Accounts Payments
          </h1>
          <p className="text-sm text-slate-500">
            Manage vendor payment approvals
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {prs.map(p => {

          const total = p.totalAmount || 0;
          const low = wallet < total;

          let canPay = false;
          let timeLeft = null;

          if (p.status === "PAYMENT_PENDING" && p.dueDate) {

            const now = new Date().getTime();
            const due = new Date(p.dueDate).getTime();

            const diff = due - now;

            if (diff <= 0) {
              canPay = true;
            } else {
              timeLeft = {
                d: Math.floor(diff / (1000 * 60 * 60 * 24)),
                h: Math.floor(diff / (1000 * 60 * 60)) % 24,
                m: Math.floor(diff / (1000 * 60)) % 60,
                s: Math.floor(diff / 1000) % 60
              };
            }
          }
          return (
            <motion.div
              key={p._id}
              whileHover={{ y: -6 }}
              className="relative bg-white rounded-3xl p-6 shadow-md border border-slate-100"
            >

              <div className="absolute top-5 right-5 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-xl shadow-sm">
                <StatusBadge status={p.status} />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                {p.materialName}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Vendor: {p.vendor?.name || "—"}
              </p>

              {/* TIMER ONLY AFTER RECEIVED */}
              {p.status === "PAYMENT_PENDING" && !canPay && timeLeft && (
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-3 shadow-sm">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-1">
                    <FaClock className="text-blue-600" />
                    Credit Cycle Running
                  </div>
                  <div className="text-xs text-blue-600">
                    Payment unlocks in
                  </div>
                  <div className="mt-1 text-sm font-bold text-blue-800">
                    {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
                  </div>
                </div>
              )}
              {p.status === "SUPERADMIN_APPROVED" && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-3 shadow-sm">
                  <div className="text-yellow-700 font-semibold text-sm">
                    Waiting for Material Receipt
                  </div>
                  <div className="text-xs text-yellow-600 mt-1">
                    Credit cycle will start after full GRN
                  </div>
                </div>
              )}
              {canPay && (
                <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-3 shadow-sm">
                  <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                    <FaCheckCircle className="text-green-600" />
                    Payment Day Active
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    You can now complete vendor payment
                  </div>
                </div>
              )}

              <p className="text-sm text-slate-500 mt-2">
                Qty: {p.quantity}
              </p>

              <div className="mt-5 flex items-center gap-2 text-indigo-600 text-xl font-bold">
                <FaRupeeSign />
                {total.toLocaleString()}
              </div>

              <button
                disabled={p.status !== "PAYMENT_PENDING" || !canPay}
                onClick={() => setSelectedPR(p)}
                className={`mt-6 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition
                ${!canPay
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : low
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
              >
                <FaCheckCircle />
                {p.status === "SUPERADMIN_APPROVED"
                  ? "Waiting GRN"
                  : canPay
                    ? "Pay Now"
                    : "Waiting Payment Day"}
              </button>

            </motion.div>
          );
        })}

        <AnimatePresence>
          {showDuePopup && (
            <motion.div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative"
              >
                <button
                  onClick={() => setShowDuePopup(false)}
                  className="absolute top-4 right-4"
                >
                  <X />
                </button>

                <h2 className="text-xl font-bold text-red-600 mb-3">
                  🔔 Payment Due Today
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                  The following payments are ready today:
                </p>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {dueTodayList.map(item => (
                    <div
                      key={item._id}
                      className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm"
                    >
                      <div className="font-semibold text-red-700">
                        {item.materialName}
                      </div>

                      <div className="text-gray-600 mt-1">
                        Vendor: <span className="font-medium">
                          {item.vendor?.name || "—"}
                        </span>
                      </div>

                      <div className="text-gray-600 mt-1">
                        Amount: ₹ {item.totalAmount?.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowDuePopup(false)}
                  className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl"
                >
                  OK
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedPR && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <motion.div className="bg-white w-full max-w-md rounded-3xl p-6 relative shadow-2xl">
              <button
                onClick={() => setSelectedPR(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h2 className="text-xl font-bold mb-4">
                Confirm Payment
              </h2>

              <input
                placeholder="Receipt number"
                value={receiptNo}
                onChange={(e) => setReceiptNo(e.target.value)}
                className="w-full border px-4 py-3 rounded-xl"
              />

              <button
                onClick={confirmPayment}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
              >
                {paying ? "Processing..." : "Confirm Payment"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
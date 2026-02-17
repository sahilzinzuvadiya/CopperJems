// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import StatusBadge from "../../components/StatusBadge";
// import { FaWallet, FaCheckCircle, FaPlus, FaRupeeSign } from "react-icons/fa";
// import { X } from "lucide-react";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AccountsPayment() {
//   const [prs, setPRs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [selectedPR, setSelectedPR] = useState(null);
//   const [receiptNo, setReceiptNo] = useState("");
//   const [paying, setPaying] = useState(false);

//   /* WALLET */
//   const [wallet, setWallet] = useState(0);
//   const [showAddMoney, setShowAddMoney] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     fetchPRs();
//     fetchWallet();
//   }, []);

//   const fetchPRs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/account/cash-approved-prs");
//       setPRs(res.data);
//     } catch {
//       toast.error("Failed to load PRs");
//     }
//     setLoading(false);
//   };

//   const fetchWallet = async () => {
//     try {
//       const res = await axios.get("/account/wallet");
//       setWallet(res.data.walletBalance || 0);
//     } catch {
//       console.log("wallet error");
//     }
//   };

//   /* ================= PAYMENT ================= */
//   const confirmPayment = async () => {
//     if (!receiptNo.trim()) {
//       toast.info("Receipt number required");
//       return;
//     }

//     const total =
//       (selectedPR.quantity || 0) * (selectedPR.expectedPrice || 0);

//     /* ❌ WALLET LOW */
//     if (wallet < total) {
//       toast.error("Insufficient wallet balance");

//       /* auto open fund request */
//       setSelectedPR(null);
//       setShowAddMoney(true);
//       return;
//     }

//     setPaying(true);
//     try {
//       const res = await axios.post(
//         `/account/cash-pay/${selectedPR._id}`,
//         { receiptNo }
//       );

//       setPRs(prev => prev.filter(p => p._id !== selectedPR._id));
//       setSelectedPR(null);
//       setReceiptNo("");

//       setWallet(res.data.walletBalance);

//       toast.success("Payment Completed");
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Payment failed"
//       );
//     }
//     setPaying(false);
//   };

//   /* ================= ADD MONEY ================= */
//   const addMoney = async () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.info("Enter valid amount");
//       return;
//     }
//     // console.log("selectedPR", p);

//     // ⭐ IMPORTANT: must select PR first
//     if (!selectedPR?._id) {
//       toast.error("Please select raw material first");
//       return;
//     }

//     setAdding(true);

//     try {
//       await axios.post("/account/request-funds", {
//         amount: Number(amount),
//         purchaseRequestId: selectedPR._id   // ⭐ SEND PR ID
//       });

//       toast.success("Fund request sent to superadmin");

//       setAmount("");
//       setShowAddMoney(false);
//       setSelectedPR(null);

//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to request funds");
//     }

//     setAdding(false);
//   };


//   return (
//     <div className="min-h-screen p-4 md:p-6">

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-8">

//         {/* LEFT */}
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow">
//             <FaWallet className="text-white text-xl" />
//           </div>

//           <div>
//             <h1 className="text-2xl font-semibold">
//               Accounts – Cash Payments
//             </h1>
//             <p className="text-sm text-gray-500">
//               Manage raw material payments
//             </p>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-4">

//           {/* WALLET */}
//           {/* <div className="bg-white px-5 py-3 rounded-2xl shadow font-semibold">
//             Wallet: ₹{wallet.toLocaleString()}
//           </div> */}

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => {
//               toast.info("Select raw material card first");
//             }}
//             className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl shadow"
//           >
//             <FaPlus />
//             Add Money
//           </motion.button>


//         </div>
//       </div>

//       {/* LOADING */}
//       {loading && (
//         <p className="text-center mt-10">Loading...</p>
//       )}

//       {/* EMPTY */}
//       {!loading && prs.length === 0 && (
//         <p className="text-center mt-10">No pending payments</p>
//       )}

//       {/* CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {prs.map(p => {
//           const total =
//             (p.quantity || 0) * (p.expectedPrice || 0);

//           const low = wallet < total;

//           return (
//             <motion.div
//               key={p._id}
//               whileHover={{ y: -5 }}
//               className="bg-white p-6 rounded-2xl shadow"
//             >
//               <div className="flex justify-between">
//                 <h3 className="font-semibold">
//                   {p.materialName}
//                 </h3>
//                 <StatusBadge status={p.status} />
//               </div>

//               <p className="text-sm text-gray-500 mt-1">
//                 Qty: {p.quantity}
//               </p>

//               <p className="text-indigo-600 font-semibold mt-2 flex items-center gap-1">
//                 <FaRupeeSign />
//                 {total.toLocaleString()}
//               </p>

//               <button
//                 onClick={() => {
//                   if (low) {
//                     toast.error("Wallet balance low");

//                     // ⭐ IMPORTANT
//                     setSelectedPR(p);
//                     setAmount(total);
//                     setShowAddMoney(true);
//                     return;
//                   }

//                   setSelectedPR(p);
//                 }}
//                 className={`mt-6 w-full py-2 rounded-lg flex items-center justify-center gap-2
//   ${low
//                     ? "bg-orange-500 text-white"
//                     : "bg-indigo-600 hover:bg-indigo-700 text-white"
//                   }`}
//               >
//                 <FaCheckCircle />
//                 {low ? "Request Funds" : "Pay"}
//               </button>

//             </motion.div>
//           );
//         })}
//       </div>

//       {/* PAYMENT MODAL */}
//       <AnimatePresence>
//         {selectedPR && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <motion.div
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               className="bg-white w-full max-w-md rounded-2xl p-6 relative"
//             >
//               <button
//                 onClick={() => setSelectedPR(null)}
//                 className="absolute top-4 right-4"
//               >
//                 <X />
//               </button>

//               <h2 className="text-xl font-bold mb-4">
//                 Confirm Payment
//               </h2>

//               <input
//                 placeholder="Receipt number"
//                 value={receiptNo}
//                 onChange={(e) => setReceiptNo(e.target.value)}
//                 className="w-full border px-4 py-2 rounded-lg"
//               />

//               <button
//                 onClick={confirmPayment}
//                 className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
//               >
//                 {paying ? "Processing..." : "Confirm"}
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ADD MONEY MODAL */}
//       <AnimatePresence>
//         {showAddMoney && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <motion.div
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               className="bg-white w-full max-w-md rounded-2xl p-6 relative"
//             >
//               <button
//                 onClick={() => setShowAddMoney(false)}
//                 className="absolute top-4 right-4"
//               >
//                 <X />
//               </button>

//               <h2 className="text-xl font-bold mb-4">
//                 Request Funds
//               </h2>

//               <input
//                 type="number"
//                 placeholder="Enter amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="w-full border px-4 py-2 rounded-lg"
//               />

//               <button
//                 onClick={addMoney}
//                 className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg"
//               >
//                 {adding ? "Sending..." : "Send Request"}
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import StatusBadge from "../../components/StatusBadge";
import { FaWallet, FaCheckCircle, FaPlus, FaRupeeSign } from "react-icons/fa";
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
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchPRs();
    fetchWallet();
  }, []);

  const fetchPRs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/account/cash-approved-prs");
      setPRs(res.data);
    } catch {
      toast.error("Failed to load PRs");
    }
    setLoading(false);
  };

  const fetchWallet = async () => {
    try {
      const res = await axios.get("/account/wallet");
      setWallet(res.data.walletBalance || 0);
    } catch {}
  };

  const confirmPayment = async () => {
    if (!receiptNo.trim()) {
      toast.info("Receipt number required");
      return;
    }

    const total =
      (selectedPR.quantity || 0) * (selectedPR.expectedPrice || 0);

    if (wallet < total) {
      toast.error("Insufficient wallet balance");
      setSelectedPR(null);
      setShowAddMoney(true);
      return;
    }

    setPaying(true);
    try {
      const res = await axios.post(
        `/account/cash-pay/${selectedPR._id}`,
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

  const addMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.info("Enter valid amount");
      return;
    }

    if (!selectedPR?._id) {
      toast.error("Please select raw material first");
      return;
    }

    setAdding(true);
    try {
      await axios.post("/account/request-funds", {
        amount: Number(amount),
        purchaseRequestId: selectedPR._id
      });

      toast.success("Fund request sent to superadmin");

      setAmount("");
      setShowAddMoney(false);
      setSelectedPR(null);
    } catch {
      toast.error("Failed to request funds");
    }
    setAdding(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-5 md:p-2">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6 md:mb-8">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow">
            <FaWallet className="text-white text-lg md:text-xl" />
          </div>

          <div>
            <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold">
              Accounts – Cash Payments
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Manage raw material payments
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.info("Select raw material card first")}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-2 lg:px-5 py-2.5 md:py-3 md:text-[11px] lg:py-3 rounded-xl shadow text-sm md:text-base w-full sm:w-auto"
          >
            <FaPlus />
            Add Money
          </motion.button>
        </div>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center mt-10">Loading...</p>}

      {/* EMPTY */}
      {!loading && prs.length === 0 && (
        <p className="text-center mt-10 text-sm md:text-base">
          No pending payments
        </p>
      )}

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
        {prs.map(p => {
          const total =
            (p.quantity || 0) * (p.expectedPrice || 0);

          const low = wallet < total;

          return (
            <motion.div
              key={p._id}
              whileHover={{ y: -4 }}
              className="bg-white p-4 md:p-6 rounded-2xl shadow"
            >
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">
                  {p.materialName}
                </h3>
                <StatusBadge status={p.status} />
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Qty: {p.quantity}
              </p>

              <p className="text-indigo-600 font-semibold mt-3 flex items-center gap-1 text-sm sm:text-base md:text-lg">
                <FaRupeeSign />
                {total.toLocaleString()}
              </p>

              <button
                onClick={() => {
                  if (low) {
                    toast.error("Wallet balance low");
                    setSelectedPR(p);
                    setAmount(total);
                    setShowAddMoney(true);
                    return;
                  }
                  setSelectedPR(p);
                }}
                className={`mt-5 w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base
                ${low
                    ? "bg-orange-500 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
              >
                <FaCheckCircle />
                {low ? "Request Funds" : "Pay"}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* PAYMENT MODAL */}
      <AnimatePresence>
        {selectedPR && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white w-full max-w-md rounded-2xl p-5 md:p-6 relative"
            >
              <button
                onClick={() => setSelectedPR(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h2 className="text-lg md:text-xl font-bold mb-4">
                Confirm Payment
              </h2>

              <input
                placeholder="Receipt number"
                value={receiptNo}
                onChange={(e) => setReceiptNo(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg text-sm md:text-base"
              />

              <button
                onClick={confirmPayment}
                className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg text-sm md:text-base"
              >
                {paying ? "Processing..." : "Confirm"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD MONEY MODAL */}
      <AnimatePresence>
        {showAddMoney && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white w-full max-w-md rounded-2xl p-5 md:p-6 relative"
            >
              <button
                onClick={() => setShowAddMoney(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h2 className="text-lg md:text-xl font-bold mb-4">
                Request Funds
              </h2>

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg text-sm md:text-base"
              />

              <button
                onClick={addMoney}
                className="w-full mt-4 bg-indigo-600 text-white py-2.5 rounded-lg text-sm md:text-base"
              >
                {adding ? "Sending..." : "Send Request"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

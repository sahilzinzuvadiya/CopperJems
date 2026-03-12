// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import {
//   FaMoneyBillWave,
//   FaUser,
//   FaCheckCircle,
//   FaClock,
//   FaBoxOpen
// } from "react-icons/fa";

// export default function AccountsPending() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [tick, setTick] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTick(t => t + 1);
//     }, 1000); // update every second

//     return () => clearInterval(timer);
//   }, []);



//   const load = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/account/pending");
//       setList(res.data);
//     } catch {
//       toast.error("Failed to load payments");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const paid = async (id) => {
//     try {
//       await axios.put("/account/paid/" + id);
//       toast.success("Payment marked as paid");
//       load();
//     } catch {
//       toast.error("Action failed");
//     }
//   };

//   const getCountdown = (dueDate) => {
//     if (!dueDate) return null;

//     const now = new Date();
//     const diff = new Date(dueDate) - now;

//     if (diff <= 0) {
//       return { text: "Overdue", type: "late" };
//     }

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     const mins = Math.floor((diff / (1000 * 60)) % 60);
//     const secs = Math.floor((diff / 1000) % 60);

//     return {
//       text: `${days}d ${hours}h ${mins}m ${secs}s left`,
//       type: "ok"
//     };
//   };



//   return (
//     <div className="min-h-screen p-4 md:p-2">
//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow">
//           <FaMoneyBillWave className="text-white text-xl" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">
//             Pending Payments
//           </h1>
//           <p className="text-sm text-slate-500">
//             Outstanding client balances
//           </p>
//         </div>
//       </div>

//       {loading && (
//         <p className="text-center text-gray-500 mt-10">Loading...</p>
//       )}

//       {!loading && list.length === 0 && (
//         <p className="text-center text-gray-500 mt-10">
//           No pending payments
//         </p>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-6">
//         {list.map((i, index) => (
//           <motion.div
//             key={i._id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//             whileHover={{ scale: 1.02 }}
//             className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500 relative"
//           >
//             {/* STATUS BADGE */}
//             <span className="absolute top-4 right-4 text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
//               <FaClock />
//               Pending
//             </span>

            

//             {/* CLIENT */}
//             <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
//               <FaUser className="text-indigo-500" />
//               {i.client?.name}
//             </h3>

//                {/* PRODUCT */}
//             <p className="text-sm mt-3 flex items-center gap-2 text-slate-600">
//               <FaBoxOpen className="text-blue-500" />
//               {i.wireType} Wire
//             </p>


//             {/* LIVE TIMER */}
//             {(() => {
//               const cd = getCountdown(i.dueDate);
//               return cd ? (
//                 <div className="mt-3">
//                   <div
//                     className={`
//           inline-flex items-center gap-2 px-3 py-1.5 rounded-full
//           text-xs font-semibold shadow-sm
//           ${cd.type === "ok" && "bg-blue-50 text-blue-700"}
//           ${cd.type === "late" && "bg-red-50 text-red-700"}
//         `}
//                   >
//                     <span className="text-sm">⏳</span>
//                     <span className="tracking-wide font-medium">
//                       {cd.text}
//                     </span>
//                   </div>
//                 </div>
//               ) : null;
//             })()}

         

//             {/* AMOUNT */}
//             <div className="mt-5 bg-slate-50 p-4 rounded-xl text-center">
//               <p className="text-xs text-gray-500">Amount Due</p>
//               <p className="text-2xl font-bold text-emerald-600 mt-1">
//                 ₹ {Number(i.total).toLocaleString()}
//               </p>
//             </div>

//             {/* BUTTON */}
//             <button
//               onClick={() => paid(i._id)}
//               className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow"
//             >
//               <FaCheckCircle />
//               Mark as Paid
//             </button>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
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

/* ── Shared theme tokens ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function AccountsPending() {
  const [list,    setList]    = useState([]);
  const [loading, setLoading] = useState(false);
  const [tick,    setTick]    = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
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

  useEffect(() => { load(); }, []);

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
    const diff = new Date(dueDate) - new Date();
    if (diff <= 0) return { text: "Overdue", type: "late" };
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);
    const secs  = Math.floor((diff / 1000) % 60);
    return { text: `${days}d ${hours}h ${mins}m ${secs}s left`, type: "ok" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 md:p-2"
    >

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #059669, #10b981)",
            boxShadow: "0 0 20px rgba(16,185,129,0.35)",
          }}
        >
          <FaMoneyBillWave className="text-white" size={18} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Pending Payments
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Outstanding client balances
          </p>
        </div>
      </div>

      {/* ── STATES ── */}
      {loading && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>Loading...</p>
      )}
      {!loading && list.length === 0 && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          No pending payments
        </p>
      )}

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((i, index) => {
          const cd = getCountdown(i.dueDate);

          return (
            <motion.div
              key={i._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative flex flex-col justify-between p-6 rounded-2xl"
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderLeft: "4px solid #f59e0b",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Pending badge */}
              <span
                className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                style={{
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  color: "#fbbf24",
                }}
              >
                <FaClock size={10} /> Pending
              </span>

              {/* Client */}
              <div className="flex items-center gap-3 mb-3 mt-2">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    border: `1px solid rgba(99,102,241,0.25)`,
                  }}
                >
                  <FaUser size={14} style={{ color: VIOLET }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: TEXT2 }}>Client</p>
                  <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                    {i.client?.name}
                  </p>
                </div>
              </div>

              {/* Product */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(96,165,250,0.1)",
                    border: "1px solid rgba(96,165,250,0.2)",
                  }}
                >
                  <FaBoxOpen size={14} style={{ color: "#60a5fa" }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: TEXT2 }}>Product</p>
                  <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                    {i.wireType} Wire
                  </p>
                </div>
              </div>

              {/* Countdown timer */}
              {cd && (
                <div
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold mb-4"
                  style={{
                    background: cd.type === "late"
                      ? "rgba(239,68,68,0.08)"
                      : "rgba(99,102,241,0.08)",
                    border: cd.type === "late"
                      ? "1px solid rgba(239,68,68,0.25)"
                      : `1px solid rgba(99,102,241,0.2)`,
                    color: cd.type === "late" ? "#f87171" : VIOLET,
                  }}
                >
                  <span>⏳</span>
                  <span className="tracking-wide">{cd.text}</span>
                </div>
              )}

              {/* Amount tile */}
              <div
                className="rounded-xl p-4 text-center mb-5"
                style={{
                  background: "rgba(16,185,129,0.07)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                <p className="text-xs mb-1" style={{ color: TEXT2 }}>Amount Due</p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "#34d399" }}
                >
                  ₹ {Number(i.total).toLocaleString()}
                </p>
              </div>

              {/* Mark as Paid button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => paid(i._id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaCheckCircle size={13} />
                Mark as Paid
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
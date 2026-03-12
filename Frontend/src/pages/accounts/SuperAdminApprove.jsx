// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import { FaCheckCircle, FaTimesCircle, FaWallet } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function SuperAdminApprove() {
//   const [funds, setFunds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const res = await axios.get("/account/request-funds");
//       setFunds(res.data);
//     } catch {
//       toast.error("Failed to load requests");
//     }
//     setLoading(false);
//   };

//   const approve = async (id) => {
//     try {
//       await axios.post(`/account/approve-funds/${id}`);
//       toast.success("Approved");
//       setFunds(prev => prev.filter(f => f._id !== id));
//     } catch {
//       toast.error("Failed");
//     }
//   };

//   const reject = async (id) => {
//     try {
//       await axios.post(`/account/request-funds/${id}`);
//       toast.info("Rejected");
//       setFunds(prev => prev.filter(f => f._id !== id));
//     } catch {
//       toast.error("Failed");
//     }
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-2">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <FaWallet className="text-indigo-600 text-3xl" />
//         <h1 className="text-2xl max-sm:text-[22px] font-bold">
//           Fund Requests Approval
//         </h1>
//       </div>

//       {loading && (
//         <p className="text-center mt-20 text-gray-500">Loading...</p>
//       )}

//       {!loading && funds.length === 0 && (
//         <p className="text-center mt-20 text-gray-500">
//           No pending requests
//         </p>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">

//         {funds.map((f) => {

//           const pr = f.purchaseRequest || {};
//           const total = (pr.quantity || 0) * (pr.expectedPrice || 0);

//           return (
//             <motion.div
//               key={f._id}
//               whileHover={{ y: -6 }}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-lg border-l-4 border-indigo-600 overflow-hidden"
//             >

//               <div className="p-6">

//                 <h3 className="text-2xl font-bold text-indigo-600">
//                   ₹ {f.amount.toLocaleString()}
//                 </h3>

//                 <p className="text-xs text-gray-400 mt-1">
//                   Requested on {new Date(f.createdAt).toLocaleDateString()}
//                 </p>

//                 <div className="border-t my-4"></div>

//                 <div className="space-y-2 text-sm">

//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Material</span>
//                     <span className="font-medium">
//                       {pr.materialName || "-"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Quantity</span>
//                     <span className="font-medium">
//                       {pr.quantity || 0}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Rate</span>
//                     <span className="font-medium">
//                       ₹ {pr.expectedPrice?.toLocaleString?.() || 0}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Total</span>
//                     <span className="font-semibold text-indigo-600">
//                       ₹ {total.toLocaleString()}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Requested By</span>
//                   <span className="font-medium">
//   {f.requestedBy?.name || f.requestedBy?.email || "-"}
// </span>

//                   </div>

//                 </div>
//               </div>

//               {/* BUTTONS */}
//               <div className="p-4 bg-gray-50 flex gap-3">
//                 <button
//                   onClick={() => approve(f._id)}
//                   className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
//                 >
//                   <FaCheckCircle />
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => reject(f._id)}
//                   className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
//                 >
//                   <FaTimesCircle />
//                   Reject
//                 </button>
//               </div>

//             </motion.div>
//           );
//         })}

//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaWallet } from "react-icons/fa";
import { toast } from "react-toastify";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function SuperAdminApprove() {
  const [funds,   setFunds]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res = await axios.get("/account/request-funds");
      setFunds(res.data);
    } catch { toast.error("Failed to load requests"); }
    setLoading(false);
  };

  const approve = async (id) => {
    try {
      await axios.post(`/account/approve-funds/${id}`);
      toast.success("Approved");
      setFunds(prev => prev.filter(f => f._id !== id));
    } catch { toast.error("Failed"); }
  };

  const reject = async (id) => {
    try {
      await axios.post(`/account/request-funds/${id}`);
      toast.info("Rejected");
      setFunds(prev => prev.filter(f => f._id !== id));
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="min-h-screen p-4 md:p-2">

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <FaWallet className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl max-sm:text-[22px] font-bold" style={{ color: TEXT1 }}>
            Fund Requests Approval
          </h1>
          <p className="text-sm mt-0.5" style={{ color: TEXT2 }}>
            Review and action pending fund requests
          </p>
        </div>
      </div>

      {/* ── STATES ── */}
      {loading && (
        <p className="text-center mt-20 text-sm" style={{ color: TEXT2 }}>Loading...</p>
      )}
      {!loading && funds.length === 0 && (
        <p className="text-center mt-20 text-sm" style={{ color: TEXT2 }}>No pending requests</p>
      )}

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {funds.map((f) => {
          const pr    = f.purchaseRequest || {};
          const total = (pr.quantity || 0) * (pr.expectedPrice || 0);

          return (
            <motion.div
              key={f._id}
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${INDIGO}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Card body */}
              <div className="p-6">

                {/* Amount */}
                <h3 className="text-2xl font-bold" style={{ color: VIOLET }}>
                  ₹ {f.amount.toLocaleString()}
                </h3>
                <p className="text-xs mt-1" style={{ color: TEXT2 }}>
                  Requested on {new Date(f.createdAt).toLocaleDateString()}
                </p>

                {/* Divider */}
                <div
                  className="my-4"
                  style={{ borderTop: `1px solid ${BORDER}` }}
                />

                {/* Details */}
                <div className="space-y-2.5 text-sm">
                  {[
                    { label: "Material",     value: pr.materialName || "-"                        },
                    { label: "Quantity",     value: pr.quantity     || 0                          },
                    { label: "Rate",         value: `₹ ${pr.expectedPrice?.toLocaleString?.() || 0}` },
                    { label: "Total",        value: `₹ ${total.toLocaleString()}`, highlight: true },
                    { label: "Requested By", value: f.requestedBy?.name || f.requestedBy?.email || "-" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center">
                      <span style={{ color: TEXT2 }}>{row.label}</span>
                      <span
                        className="font-semibold"
                        style={{ color: row.highlight ? VIOLET : TEXT1 }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── ACTION BUTTONS ── */}
              <div
                className="px-6 py-4 flex gap-3"
                style={{ borderTop: `1px solid ${BORDER}`, background: "rgba(99,102,241,0.04)" }}
              >
                <button
                  onClick={() => approve(f._id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    color: "#34d399",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.22)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.12)"}
                >
                  <FaCheckCircle /> Approve
                </button>

                <button
                  onClick={() => reject(f._id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#f87171",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.22)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
                >
                  <FaTimesCircle /> Reject
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
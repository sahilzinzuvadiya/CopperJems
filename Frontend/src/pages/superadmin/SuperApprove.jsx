// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { Check, X, FileCheck } from "lucide-react";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// export default function SuperApprovePO() {
//   const [pos, setPOs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadPOs();
//   }, []);

//   const loadPOs = async () => {
//     try {
//       const res = await axios.get("/purchase/pending-po");
//       setPOs(res.data);
//     } catch {
//       toast.error("Failed to load approvals");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const approve = async (id) => {
//     try {
//       await axios.put(`/purchase/approve-po/${id}`);
//       toast.success("PO approved");
//       setPOs(prev => prev.filter(p => p._id !== id));
//     } catch {
//       toast.error("Approval failed");
//     }
//   };

//   const reject = async (id) => {
//     try {
//       await axios.put(`/purchase/reject-po/${id}`);
//       toast.error("PO rejected");
//       setPOs(prev => prev.filter(p => p._id !== id));
//     } catch {
//       toast.error("Rejection failed");
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center text-slate-400 py-20">
//         Loading purchase orders...
//       </p>
//     );
//   }

//   return (
//     <div className="w-full">

//       {/* 🔷 PAGE HEADING */}
//       <div className="flex items-center gap-4 mb-6">
//         <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
//           <FileCheck className="text-white" size={22} />
//         </div>

//         <div>
//           <h2 className="text-xl font-bold text-slate-800">
//             Purchase Order Approvals
//           </h2>
//           <p className="text-sm text-slate-500">
//             SuperAdmin approval required for created POs
//           </p>
//         </div>
//       </div>

//       {/* 🔷 LIST */}
//       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {pos.map((p) => (
//           <motion.div
//             key={p._id}
//             whileHover={{ y: -4 }}
//             className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
//           >
//             {/* STATUS */}
//             <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full
//                              bg-yellow-100 text-yellow-700">
//               PO Waiting Approval
//             </span>

//             {/* VENDOR */}
//             <p className="text-xs text-slate-400">Vendor</p>
//             <p className="font-semibold text-slate-800">
//               {p.vendor?.name}
//             </p>

//             {/* DETAILS */}
//             <div className="mt-4 space-y-1 text-sm">
//               <p><b>Material:</b> {p.materialName}</p>
//               <p><b>Qty:</b> {p.quantity}</p>
//               <p><b>Rate:</b> ₹{p.finalRate}</p>
//               <p><b>Total:</b> ₹{p.totalAmount}</p>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => approve(p._id)}
//                 className="flex-1 flex items-center justify-center gap-2
//                            border border-green-500 text-green-600
//                            rounded-xl py-2 hover:bg-green-50"
//               >
//                 <Check size={16} />
//                 Approve
//               </button>

//               <button
//                 onClick={() => reject(p._id)}
//                 className="flex-1 flex items-center justify-center gap-2
//                            border border-red-500 text-red-600
//                            rounded-xl py-2 hover:bg-red-50"
//               >
//                 <X size={16} />
//                 Reject
//               </button>
//             </div>
//           </motion.div>
//         ))}

//         {pos.length === 0 && (
//           <p className="col-span-full text-center text-slate-400 py-20">
//             No pending PO approvals
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Check, X, FileCheck } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function SuperApprovePO() {
  const [pos,     setPOs]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPOs(); }, []);

  const loadPOs = async () => {
    try {
      const res = await axios.get("/purchase/pending-po");
      setPOs(res.data);
    } catch { toast.error("Failed to load approvals"); }
    finally  { setLoading(false); }
  };

  const approve = async (id) => {
    try {
      await axios.put(`/purchase/approve-po/${id}`);
      toast.success("PO approved");
      setPOs(prev => prev.filter(p => p._id !== id));
    } catch { toast.error("Approval failed"); }
  };

  const reject = async (id) => {
    try {
      await axios.put(`/purchase/reject-po/${id}`);
      toast.error("PO rejected");
      setPOs(prev => prev.filter(p => p._id !== id));
    } catch { toast.error("Rejection failed"); }
  };

  if (loading) return (
    <p className="text-center py-20 text-sm" style={{ color: TEXT2 }}>
      Loading purchase orders...
    </p>
  );

  return (
    <div className="w-full">

      {/* ── HEADER ── */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <FileCheck className="text-white" size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: TEXT1 }}>
            Purchase Order Approvals
          </h2>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            SuperAdmin approval required for created POs
          </p>
        </div>
      </div>

      {/* ── PO CARDS ── */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {pos.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative flex flex-col justify-between p-6 rounded-2xl"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Status badge */}
            <span
              className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                background: "rgba(234,179,8,0.12)",
                border: "1px solid rgba(234,179,8,0.3)",
                color: "#fbbf24",
              }}
            >
              Waiting Approval
            </span>

            {/* Vendor */}
            <div className="mb-4">
              <p className="text-xs mb-1" style={{ color: TEXT2 }}>Vendor</p>
              <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                {p.vendor?.name}
              </p>
            </div>

            {/* Details */}
            <div
              className="space-y-2 text-sm py-4"
              style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
            >
              {[
                { label: "Material", value: p.materialName },
                { label: "Qty",      value: p.quantity },
                { label: "Rate",     value: `₹${p.finalRate}` },
                { label: "Total",    value: `₹${p.totalAmount}` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span style={{ color: TEXT2 }}>{row.label}</span>
                  <span className="font-medium" style={{ color: TEXT1 }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => approve(p._id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#34d399",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.1)"}
              >
                <Check size={15} /> Approve
              </button>

              <button
                onClick={() => reject(p._id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
              >
                <X size={15} /> Reject
              </button>
            </div>
          </motion.div>
        ))}

        {pos.length === 0 && (
          <p className="col-span-full text-center py-20 text-sm" style={{ color: TEXT2 }}>
            No pending PO approvals
          </p>
        )}
      </div>
    </div>
  );
}
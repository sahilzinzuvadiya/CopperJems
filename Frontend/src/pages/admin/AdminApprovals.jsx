// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";
// import { Check, X, ClipboardCheck } from "lucide-react";

// export default function AdminApprovals() {
//   const [prs, setPRs] = useState([]);
//   const [rejectId, setRejectId] = useState(null);
//   const [reason, setReason] = useState("");

//   useEffect(() => {
//     fetchPRs();
//   }, []);

//   const fetchPRs = async () => {
//     try {
//       const res = await axios.get("/purchase/pending/admin");
//       setPRs(res.data);
//     } catch {
//       toast.error("Failed to load requests");
//     }
//   };

//   const approve = async (id) => {
//     try {
//       await axios.put(`/purchase/admin-approve/${id}`);
//       toast.success("Request approved");
//       setPRs((prev) => prev.filter((p) => p._id !== id));
//     } catch {
//       toast.error("Approval failed");
//     }
//   };

//   const reject = async () => {
//     if (!reason.trim()) {
//       toast.warning("Enter rejection reason");
//       return;
//     }

//     try {
//       await axios.put(`/purchase/admin-reject/${rejectId}`, { reason });
//       toast.error("Request rejected");
//       setPRs((prev) => prev.filter((p) => p._id !== rejectId));
//       setRejectId(null);
//       setReason("");
//     } catch {
//       toast.error("Rejection failed");
//     }
//   };

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
//           <ClipboardCheck className="text-white" size={22} />
//         </div>

//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">
//             Admin Purchase Approvals
//           </h1>
//           <p className="text-sm text-slate-500">
//             Review and approve employee purchase requests
//           </p>
//         </div>
//       </div>

//       {/* ================= REQUEST LIST ================= */}
//       <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
//         {prs.map((p) => (
//           <div
//             key={p._id}
//             className="
//               relative bg-white rounded-xl p-5
//               border border-slate-200
//               hover:shadow-lg hover:border-indigo-500
//               transition
//             "
//           >
//             {/* STATUS BADGE */}
//             <span className="absolute top-4 right-4 text-xs font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
//               Pending
//             </span>

//             {/* EMPLOYEE */}
//             <p className="text-sm text-slate-500 mb-1">
//               Requested by
//             </p>
//             <p className="font-semibold text-slate-800">
//               {p.createdBy?.name || "Employee"}
//             </p>

//             {/* MATERIAL */}
//             <div className="mt-4">
//               <p className="text-xs text-slate-400">Material</p>
//               <p className="font-medium text-slate-700">
//                 {p.materialName}
//               </p>
//             </div>

//             {/* DETAILS */}
//             <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-slate-400">Quantity</p>
//                 <p className="font-medium">{p.quantity}</p>
//               </div>
//               <div>
//                 <p className="text-slate-400">Expected Price</p>
//                 <p className="font-medium">₹{p.expectedPrice}</p>
//               </div>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => approve(p._id)}
//                 className="flex-1 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition text-sm font-medium"
//               >
//                 <Check size={16} className="inline mr-1" />
//                 Approve
//               </button>

//               <button
//                 onClick={() => setRejectId(p._id)}
//                 className="flex-1 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition text-sm font-medium"
//               >
//                 <X size={16} className="inline mr-1" />
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}

//         {prs.length === 0 && (
//           <p className="col-span-full text-center text-slate-400 py-20">
//             No pending purchase requests
//           </p>
//         )}
//       </div>

//       {/* ================= REJECT MODAL ================= */}
//       {rejectId && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
//           <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
//             <button
//               onClick={() => setRejectId(null)}
//               className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
//             >
//               <X size={18} />
//             </button>

//             <h3 className="text-lg font-semibold mb-2">
//               Reject Purchase Request
//             </h3>

//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               placeholder="Enter rejection reason"
//               className="w-full h-28 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
//             />

//             <div className="flex justify-end gap-3 mt-5">
//               <button
//                 onClick={() => setRejectId(null)}
//                 className="px-4 py-2 rounded-lg bg-slate-100"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={reject}
//                 className="px-4 py-2 rounded-lg bg-red-600 text-white"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { Check, X, ClipboardCheck } from "lucide-react";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function AdminApprovals() {
  const [prs,      setPRs]      = useState([]);
  const [rejectId, setRejectId] = useState(null);
  const [reason,   setReason]   = useState("");

  useEffect(() => { fetchPRs(); }, []);

  const fetchPRs = async () => {
    try {
      const res = await axios.get("/purchase/pending/admin");
      setPRs(res.data);
    } catch { toast.error("Failed to load requests"); }
  };

  const approve = async (id) => {
    try {
      await axios.put(`/purchase/admin-approve/${id}`);
      toast.success("Request approved");
      setPRs(prev => prev.filter(p => p._id !== id));
    } catch { toast.error("Approval failed"); }
  };

  const reject = async () => {
    if (!reason.trim()) { toast.warning("Enter rejection reason"); return; }
    try {
      await axios.put(`/purchase/admin-reject/${rejectId}`, { reason });
      toast.error("Request rejected");
      setPRs(prev => prev.filter(p => p._id !== rejectId));
      setRejectId(null);
      setReason("");
    } catch { toast.error("Rejection failed"); }
  };

  return (
    <>
      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <ClipboardCheck className="text-white" size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Admin Purchase Approvals
          </h1>
          <p className="text-sm mt-0.5" style={{ color: TEXT2 }}>
            Review and approve employee purchase requests
          </p>
        </div>
      </div>

      {/* ── REQUEST GRID ── */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {prs.map((p) => (
          <div
            key={p._id}
            className="relative rounded-2xl p-5 transition-all"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.border = `1px solid rgba(99,102,241,0.4)`;
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = `1px solid ${BORDER}`;
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
            }}
          >
            {/* Pending badge */}
            <span
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(234,179,8,0.15)",
                border: "1px solid rgba(234,179,8,0.3)",
                color: "#fbbf24",
              }}
            >
              Pending
            </span>

            {/* Requested by */}
            <p className="text-xs mb-0.5" style={{ color: TEXT2 }}>Requested by</p>
            <p className="font-semibold" style={{ color: TEXT1 }}>
              {p.createdBy?.name || "Employee"}
            </p>

            {/* Material */}
            <div className="mt-4">
              <p className="text-xs mb-0.5" style={{ color: TEXT2 }}>Material</p>
              <p className="font-medium" style={{ color: TEXT1 }}>{p.materialName}</p>
            </div>

            {/* Details */}
            <div
              className="mt-4 pt-4 grid grid-cols-2 gap-3 text-sm"
              style={{ borderTop: `1px solid ${BORDER}` }}
            >
              <div>
                <p className="text-xs mb-0.5" style={{ color: TEXT2 }}>Quantity</p>
                <p className="font-semibold" style={{ color: TEXT1 }}>{p.quantity}</p>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: TEXT2 }}>Expected Price</p>
                <p className="font-semibold" style={{ color: TEXT1 }}>₹{p.expectedPrice}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => approve(p._id)}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#34d399",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.22)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.12)"}
              >
                <Check size={15} /> Approve
              </button>

              <button
                onClick={() => setRejectId(p._id)}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1"
                style={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.22)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
              >
                <X size={15} /> Reject
              </button>
            </div>
          </div>
        ))}

        {prs.length === 0 && (
          <p className="col-span-full text-center py-20 text-sm" style={{ color: TEXT2 }}>
            No pending purchase requests
          </p>
        )}
      </div>

      {/* ── REJECT MODAL ── */}
      {rejectId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-6"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 32px 64px rgba(0,0,0,0.7)",
            }}
          >
            {/* Top glow */}
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: "160px", height: "1px",
              background: "linear-gradient(90deg, transparent, #f87171, transparent)",
            }} />

            <button
              onClick={() => setRejectId(null)}
              className="absolute top-4 right-4 transition"
              style={{ color: TEXT2 }}
              onMouseEnter={e => e.currentTarget.style.color = TEXT1}
              onMouseLeave={e => e.currentTarget.style.color = TEXT2}
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-4" style={{ color: TEXT1 }}>
              Reject Purchase Request
            </h3>

            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Enter rejection reason"
              className="w-full h-28 rounded-xl p-3 outline-none text-sm resize-none"
              style={{
                background: "rgba(99,102,241,0.06)",
                border: `1px solid ${BORDER}`,
                color: TEXT1,
                caretColor: VIOLET,
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)";
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setRejectId(null)}
                className="px-4 py-2 rounded-xl text-sm transition"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${BORDER}`,
                  color: TEXT2,
                }}
                onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                onMouseLeave={e => e.currentTarget.style.color = TEXT2}
              >
                Cancel
              </button>

              <button
                onClick={reject}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #f97316)",
                  boxShadow: "0 4px 16px rgba(239,68,68,0.35)",
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
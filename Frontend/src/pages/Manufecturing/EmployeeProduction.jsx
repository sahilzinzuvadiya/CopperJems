// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaIndustry,
//   FaPlay,
//   FaCheckCircle,
//   FaTimes,
//   FaBoxOpen
// } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function EmployeeProduction() {
//   const [list, setList] = useState([]);
//   const [active, setActive] = useState(null);
//   const [qty, setQty] = useState("");
//   const [loading, setLoading] = useState(false);

//   const load = () => {
//     axios.get("/production").then(res => setList(res.data));
//   };

//   useEffect(load, []);

//   const start = async (id) => {
//     try {
//       await axios.put("/production/start/" + id);
//       toast.success("Production started");
//       load();
//     } catch {
//       toast.error("Error starting");
//     }
//   };

//   const complete = async () => {
//     if (!qty) return toast.error("Enter output qty");

//     try {
//       setLoading(true);

//       await axios.put("/production/complete/" + active._id, {
//         outputQty: Number(qty)
//       });

//       toast.success("Production completed");

//       setActive(null);
//       setQty("");
//       load();

//     } catch {
//       toast.error("Error completing");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen p-1 md:p-2">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
//           <FaIndustry className="text-white text-xl" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">
//             Production Tasks
//           </h1>
//           <p className="text-sm text-slate-500">
//             Start and complete manufacturing jobs
//           </p>
//         </div>
//       </div>

//       {/* LIST */}
//       <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
//         {list.map((p) => (
//           <motion.div
//             key={p._id}
//             whileHover={{ scale: 1.03 }}
//             className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-600"
//           >
//             <h3 className="text-lg font-semibold text-slate-800">
//               {p.wireType} Wire
//             </h3>

//             <p className="text-sm text-slate-500 mt-1">
//               Raw Used: <b>{p.rawQtyUsed}</b>
//             </p>

//             <p className="text-sm mt-2">
//               Status:
//               <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold
//                 ${p.status === "COMPLETED" ? "bg-green-100 text-green-700" :
//                   p.status === "IN_PROGRESS" ? "bg-yellow-100 text-yellow-700" :
//                   "bg-gray-100 text-gray-700"}
//               `}>
//                 {p.status}
//               </span>
//             </p>

//             {/* ACTIONS */}
//             <div className="mt-5 flex gap-3">
//               {p.status === "PENDING" && (
//                 <button
//                   onClick={() => start(p._id)}
//                   className="flex-1 bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700"
//                 >
//                   <FaPlay />
//                   Start
//                 </button>
//               )}

//               {p.status === "IN_PROGRESS" && (
//                 <button
//                   onClick={() => setActive(p)}
//                   className="flex-1 bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
//                 >
//                   <FaCheckCircle />
//                   Complete
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ================= MODAL ================= */}
//       <AnimatePresence>
//         {active && (
//           <motion.div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.8, y: 40 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.8 }}
//               className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl"
//             >
//               {/* CLOSE */}
//               <button
//                 onClick={() => setActive(null)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-black"
//               >
//                 <FaTimes />
//               </button>

//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <FaBoxOpen className="text-indigo-600" />
//                 Complete Production
//               </h2>

//               <p className="text-sm text-gray-500 mb-4">
//                 Wire Type: <b>{active.wireType}</b>
//               </p>

//               <input
//                 type="number"
//                 value={qty}
//                 onChange={(e) => setQty(e.target.value)}
//                 placeholder="Enter output qty"
//                 className="w-full border rounded-lg px-4 py-2 mb-4"
//               />

//               <button
//                 onClick={complete}
//                 disabled={loading}
//                 className="w-full bg-indigo-600 text-white py-2 rounded-lg"
//               >
//                 {loading ? "Saving..." : "Complete"}
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
import { motion, AnimatePresence } from "framer-motion";
import {
  FaIndustry, FaPlay, FaCheckCircle, FaTimes, FaBoxOpen
} from "react-icons/fa";
import { toast } from "react-toastify";

/* ── Theme tokens (identical to AdminDashboard) ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

/* Status pill config */
const STATUS_STYLE = {
  COMPLETED:   { bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)",  color: "#34d399"  },
  IN_PROGRESS: { bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  color: "#fbbf24"  },
  PENDING:     { bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)",  color: "#a78bfa"  },
};

export default function EmployeeProduction() {
  const [list,    setList]    = useState([]);
  const [active,  setActive]  = useState(null);
  const [qty,     setQty]     = useState("");
  const [loading, setLoading] = useState(false);

  const load = () => {
    axios.get("/production").then(res => setList(res.data));
  };

  useEffect(load, []);

  const start = async (id) => {
    try {
      await axios.put("/production/start/" + id);
      toast.success("Production started");
      load();
    } catch {
      toast.error("Error starting");
    }
  };

  const complete = async () => {
    if (!qty) return toast.error("Enter output qty");
    try {
      setLoading(true);
      await axios.put("/production/complete/" + active._id, { outputQty: Number(qty) });
      toast.success("Production completed");
      setActive(null); setQty(""); load();
    } catch {
      toast.error("Error completing");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-1 md:p-2"
    >

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <FaIndustry className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Production Tasks
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Start and complete manufacturing jobs
          </p>
        </div>
      </div>

      {/* ── EMPTY ── */}
      {list.length === 0 && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          No production tasks assigned
        </p>
      )}

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {list.map((p) => {
          const s = STATUS_STYLE[p.status] || STATUS_STYLE.PENDING;
          return (
            <motion.div
              key={p._id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="relative flex flex-col justify-between p-6 rounded-2xl"
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${INDIGO}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Status badge */}
              <span
                className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
              >
                {p.status.replace("_", " ")}
              </span>

              {/* Title */}
              <div className="flex items-center gap-3 mb-4 mt-1">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                    boxShadow: `0 0 14px rgba(99,102,241,0.3)`,
                  }}
                >
                  {p.wireType?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                    {p.wireType} Wire
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>Production Job</p>
                </div>
              </div>

              {/* Raw used */}
              <div
                className="flex justify-between items-center px-3 py-2 rounded-xl mb-5"
                style={{ background: "rgba(99,102,241,0.07)", border: `1px solid ${BORDER}` }}
              >
                <span className="text-xs" style={{ color: TEXT2 }}>Raw Used</span>
                <span className="text-sm font-bold" style={{ color: TEXT1 }}>{p.rawQtyUsed}</span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                {p.status === "PENDING" && (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => start(p._id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                      boxShadow: `0 4px 14px rgba(99,102,241,0.35)`,
                      border: "none", cursor: "pointer",
                    }}
                  >
                    <FaPlay size={12} /> Start
                  </motion.button>
                )}

                {p.status === "IN_PROGRESS" && (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActive(p)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: "linear-gradient(135deg, #059669, #10b981)",
                      boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                      border: "none", cursor: "pointer",
                    }}
                  >
                    <FaCheckCircle size={13} /> Complete
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{   scale: 0.9,  opacity: 0 }}
            >
              <div
                className="w-full max-w-md rounded-2xl p-6 relative"
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 32px 64px rgba(0,0,0,0.7)",
                }}
              >
                {/* Top glow line */}
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: "160px", height: "1px",
                  background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
                }} />

                {/* Close */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 transition"
                  style={{ color: TEXT2, background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT2}
                >
                  <FaTimes size={16} />
                </button>

                <h2 className="text-lg font-bold mb-1 flex items-center gap-2" style={{ color: TEXT1 }}>
                  <FaBoxOpen style={{ color: VIOLET }} />
                  Complete Production
                </h2>
                <p className="text-sm mb-5" style={{ color: TEXT2 }}>
                  Wire Type:{" "}
                  <span className="font-semibold" style={{ color: TEXT1 }}>{active.wireType}</span>
                </p>

                <input
                  type="number"
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                  placeholder="Enter output qty"
                  style={{
                    background: "rgba(99,102,241,0.06)",
                    border: `1px solid ${BORDER}`,
                    color: TEXT1,
                    outline: "none",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    width: "100%",
                    fontSize: "14px",
                    marginBottom: "16px",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(167,139,250,0.6)";
                    e.target.style.boxShadow   = "0 0 0 3px rgba(99,102,241,0.15)";
                    e.target.style.background  = "rgba(99,102,241,0.1)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = BORDER;
                    e.target.style.boxShadow   = "none";
                    e.target.style.background  = "rgba(99,102,241,0.06)";
                  }}
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setActive(null)}
                    className="px-5 py-2 rounded-xl text-sm font-medium transition"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${BORDER}`,
                      color: TEXT2, cursor: "pointer",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  >
                    Cancel
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={complete}
                    disabled={loading}
                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: "linear-gradient(135deg, #059669, #10b981)",
                      boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                      border: "none", cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? "Saving..." : "Complete"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
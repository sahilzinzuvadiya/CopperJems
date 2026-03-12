// import { useState, useEffect } from "react";
// import axios from "../../api/axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaIndustry,
//   FaCheckCircle,
//   FaCubes,
//   FaPlusCircle,
//   FaTimes
// } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function ManufactureCreate() {
//   const [prs, setPRs] = useState([]);
//   const [wireType, setWireType] = useState("9mm");
//   const [qty, setQty] = useState("");
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     axios.get("/production/production-ready").then(res => setPRs(res.data));
//   }, []);

//   const create = async () => {
//     if (!qty) return toast.error("Enter quantity");

//     try {
//       setLoading(true);

//       await axios.post("/production/create", {
//         prId: selected._id,
//         wireType,
//         rawQtyUsed: qty
//       });

//       toast.success("Production created");

//       setQty("");
//       setSelected(null);
//       setQty("");

//       const res = await axios.get("/production/production-ready");
//       setPRs(res.data);

//     } catch (err) {
//       toast.error("Error creating production");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-2">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
//           <FaIndustry className="text-white text-xl" />
//         </div>
//         <div>
//           <h1 className="text-2xl max-sm:text-xl font-bold text-slate-800">
//             Manufacturing Production
//           </h1>
//           <p className="text-sm text-slate-500">
//             Create wire production from raw material
//           </p>
//         </div>
//       </div>

//       {/* MATERIAL CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
//         {prs.map((p) => (
//           <motion.div
//             key={p._id}
//             whileHover={{ scale: 1.03 }}
//             className="bg-white rounded-2xl shadow p-5"
//           >
//             <h3 className="text-lg font-semibold">{p.materialName}</h3>

//             <p className="text-sm mt-1">
//               Available: <b>{p.remainingForProduction}</b>
//             </p>

//             <button
//               onClick={() => setSelected(p)}
//               className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
//             >
//               <FaCheckCircle />
//               Start Production
//             </button>
//           </motion.div>
//         ))}
//       </div>

//       {/* ================= MODAL ================= */}
//       <AnimatePresence>
//         {selected && (
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
//                 onClick={() => setSelected(null)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-black"
//               >
//                 <FaTimes size={18} />
//               </button>

//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <FaCubes className="text-indigo-600" />
//                 Create Production
//               </h2>

//               <p className="text-sm text-gray-500 mb-4">
//                 Material: <b>{selected.materialName}</b>
//               </p>

//               {/* TYPE */}
//               <div className="mb-4">
//                 <label className="text-sm font-medium">Wire Type</label>
//                 <select
//                   value={wireType}
//                   onChange={(e) => setWireType(e.target.value)}
//                   className="w-full border rounded-lg px-4 py-2 mt-1"
//                 >
//                   <option>9mm</option>
//                   <option>12mm</option>
//                   <option>6mm</option>
//                 </select>
//               </div>

//               {/* QTY */}
//               <div className="mb-5">
//                 <label className="text-sm font-medium">Raw Qty</label>
//                 <input
//                   type="number"
//                   value={qty}
//                   onChange={(e) => setQty(e.target.value)}
//                   className="w-full border rounded-lg px-4 py-2 mt-1"
//                 />
//               </div>

//               {/* ACTIONS */}
//               <button
//                 onClick={create}
//                 disabled={loading}
//                 className="w-full bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
//               >
//                 <FaPlusCircle />
//                 {loading ? "Creating..." : "Create Production"}
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaIndustry,
  FaCheckCircle,
  FaCubes,
  FaPlusCircle,
  FaTimes
} from "react-icons/fa";
import { toast } from "react-toastify";

/* ── Shared theme tokens (same as AdminList & GRNReceive) ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

const inputStyle = {
  background: "rgba(99,102,241,0.06)",
  border: `1px solid ${BORDER}`,
  color: TEXT1,
  outline: "none",
  borderRadius: "12px",
  padding: "12px 16px",
  width: "100%",
  fontSize: "14px",
};

export default function ManufactureCreate() {
  const [prs, setPRs] = useState([]);
  const [wireType, setWireType] = useState("9mm");
  const [qty, setQty] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/production/production-ready").then(res => setPRs(res.data));
  }, []);

  const create = async () => {
    if (!qty) return toast.error("Enter quantity");
    try {
      setLoading(true);
      await axios.post("/production/create", {
        prId: selected._id,
        wireType,
        rawQtyUsed: qty
      });
      toast.success("Production created");
      setQty("");
      setSelected(null);
      const res = await axios.get("/production/production-ready");
      setPRs(res.data);
    } catch (err) {
      toast.error("Error creating production");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 md:p-6"
    >

      {/* ── HEADER ── */}
      <div className="p-2 mb-6 flex items-center gap-3">
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
            Manufacturing Production
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Create wire production from raw material
          </p>
        </div>
      </div>

      {/* ── MATERIAL CARDS ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {prs.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="relative flex flex-col justify-between p-6 rounded-2xl"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              minHeight: "160px",
            }}
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                  boxShadow: `0 0 16px rgba(99,102,241,0.35)`,
                }}
              >
                {p.materialName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                  {p.materialName}
                </p>
                <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>Raw Material</p>
              </div>
            </div>

            {/* Available qty badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm mb-4"
              style={{
                background: "rgba(99,102,241,0.07)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <FaCubes style={{ color: VIOLET }} size={13} />
              <span style={{ color: TEXT2 }}>Available:</span>
              <span className="font-bold" style={{ color: TEXT1 }}>
                {p.remainingForProduction}
              </span>
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(p)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaCheckCircle size={14} />
              Start Production
            </motion.button>
          </motion.div>
        ))}
      </div>

      {prs.length === 0 && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          No materials ready for production
        </p>
      )}

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selected && (
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
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 transition"
                  style={{ color: TEXT2, background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT2}
                >
                  <FaTimes size={18} />
                </button>

                <h2
                  className="text-lg font-bold mb-1 flex items-center gap-2"
                  style={{ color: TEXT1 }}
                >
                  <FaCubes style={{ color: VIOLET }} />
                  Create Production
                </h2>
                <p className="text-sm mb-5" style={{ color: TEXT2 }}>
                  Material:{" "}
                  <span className="font-semibold" style={{ color: TEXT1 }}>
                    {selected.materialName}
                  </span>
                </p>

                <div className="space-y-4">
                  {/* Wire Type */}
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: TEXT2 }}>
                      Wire Type
                    </label>
                    <select
                      value={wireType}
                      onChange={(e) => setWireType(e.target.value)}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={e => {
                        e.target.style.borderColor = "rgba(167,139,250,0.6)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = BORDER;
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      {["9mm", "12mm", "6mm"].map(o => (
                        <option key={o} value={o} style={{ background: "#16143a", color: TEXT1 }}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Raw Qty */}
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: TEXT2 }}>
                      Raw Qty
                    </label>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      style={inputStyle}
                      onFocus={e => {
                        e.target.style.borderColor = "rgba(167,139,250,0.6)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                        e.target.style.background = "rgba(99,102,241,0.1)";
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = BORDER;
                        e.target.style.boxShadow = "none";
                        e.target.style.background = "rgba(99,102,241,0.06)";
                      }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setSelected(null)}
                      className="px-5 py-2 rounded-xl text-sm font-medium transition"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${BORDER}`,
                        color: TEXT2,
                        cursor: "pointer",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={create}
                      disabled={loading}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                        boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      <FaPlusCircle size={13} />
                      {loading ? "Creating..." : "Create Production"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
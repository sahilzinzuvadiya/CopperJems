// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { FaBoxOpen, FaPlusCircle } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function GRNReceive() {
//   const [prs, setPRs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activePR, setActivePR] = useState(null);
//   const [receivedQty, setReceivedQty] = useState("");
//   const [damagedQty, setDamagedQty] = useState("");
//   const [remarks, setRemarks] = useState("");

//   useEffect(() => {
//     fetchPRs();
//   }, []);

//   const fetchPRs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/grn/grn-pending");
//       setPRs(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load GRN list");
//     }
//     setLoading(false);
//   };

//   /* ================= SUBMIT GRN ================= */
//   const submitGRN = async () => {
//     const qty = Number(receivedQty);
//     const dmg = Number(damagedQty || 0);

//     if (!qty || qty <= 0) {
//       alert("Enter valid received quantity");
//       return;
//     }

//     try {
//       await axios.post(`/grn/grn/${activePR._id}`, {
//         receivedQty: qty,
//         damagedQty: dmg,
//         remarks
//       });

//       toast.success("Material received successfully");

//       setActivePR(null);
//       setReceivedQty("");
//       setDamagedQty("");
//       setRemarks("");

//       fetchPRs();
//     } catch (err) {
//       console.log(err.response?.data);
//       alert(err.response?.data?.msg || "Failed to add GRN");
//     }
//   };

//   /* ================= CALCULATE ================= */
//   const totalReceived = (grns = []) =>
//     grns.reduce((sum, g) => sum + g.receivedQty + (g.damagedQty || 0), 0);




//   return (
//     <div className="min-h-screen p-4 md:p-2">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <FaBoxOpen className="text-indigo-600 text-3xl" />
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Store – Goods Receipt (GRN)
//         </h1>
//       </div>

//       {loading && (
//         <p className="text-center text-gray-500 mt-10">Loading...</p>
//       )}

//       {!loading && prs.length === 0 && (
//         <p className="text-center text-gray-500 mt-10">
//           No materials pending for receipt
//         </p>
//       )}

//       {/* PR LIST */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {prs.map((p) => {
//           const received = totalReceived(p.grns);
//           const pending = p.quantity - received;
//           const percent = ((received / p.quantity) * 100).toFixed(1);
//           const isFullyReceived = received >= p.quantity;

//           return (
//             <div key={p._id} className="bg-white p-6 rounded-2xl shadow">
//               <h3 className="text-lg font-semibold">{p.materialName}</h3>

//               <div className="mt-3 text-sm space-y-1">
//                 <p><b>Ordered:</b> {p.quantity}</p>
//                 <p><b>Received:</b> {received}</p>
//                 <p><b>Pending:</b> {pending}</p>
//                 <p><b>Completed:</b> {percent}%</p>
//               </div>

//               {/* PROGRESS */}
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//                 <div
//                   className="bg-indigo-600 h-2 rounded-full"
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>

//               {isFullyReceived ? (
//                 <div className="mt-5 bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">
//                   ✅ Material fully received
//                   <br />
//                   Credit cycle started
//                   {p.dueDate && (
//                     <>
//                       <br />
//                       Payment due on:{" "}
//                       <b>
//                         {new Date(p.dueDate).toLocaleDateString()}
//                       </b>
//                     </>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => setActivePR(p)}
//                   className="mt-5 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
//                 >
//                   <FaPlusCircle />
//                   Add Receipt
//                 </button>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* MODAL */}
//       {/* MODAL */}
//       {activePR && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">

//             {/* CLOSE X BUTTON */}
//             <button
//               onClick={() => setActivePR(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold mb-3">Receive Material</h2>
//             <p className="text-sm text-gray-500 mb-4">
//               {activePR.materialName}
//             </p>

//             <div className="space-y-3">
//               <input
//                 type="number"
//                 placeholder="Received Qty"
//                 value={receivedQty}
//                 onChange={(e) => setReceivedQty(e.target.value)}
//                 className="w-full border px-4 py-2 rounded-lg"
//               />

//               <input
//                 type="number"
//                 placeholder="Damaged Qty"
//                 value={damagedQty}
//                 onChange={(e) => setDamagedQty(e.target.value)}
//                 className="w-full border px-4 py-2 rounded-lg"
//               />

//               <textarea
//                 placeholder="Remarks"
//                 value={remarks}
//                 onChange={(e) => setRemarks(e.target.value)}
//                 className="w-full border px-4 py-2 rounded-lg"
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-5">
//               <button
//                 onClick={() => setActivePR(null)}
//                 className="px-4 py-2 border rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={submitGRN}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
//               >
//                 Save Receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

/* ── Shared theme tokens (same as AdminList) ── */
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

export default function GRNReceive() {
  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePR, setActivePR] = useState(null);
  const [receivedQty, setReceivedQty] = useState("");
  const [damagedQty, setDamagedQty] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => { fetchPRs(); }, []);

  const fetchPRs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/grn/grn-pending");
      setPRs(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load GRN list");
    }
    setLoading(false);
  };

  const submitGRN = async () => {
    const qty = Number(receivedQty);
    const dmg = Number(damagedQty || 0);
    if (!qty || qty <= 0) { alert("Enter valid received quantity"); return; }
    try {
      await axios.post(`/grn/grn/${activePR._id}`, { receivedQty: qty, damagedQty: dmg, remarks });
      toast.success("Material received successfully");
      setActivePR(null);
      setReceivedQty("");
      setDamagedQty("");
      setRemarks("");
      fetchPRs();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add GRN");
    }
  };

  const totalReceived = (grns = []) =>
    grns.reduce((sum, g) => sum + g.receivedQty + (g.damagedQty || 0), 0);

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
          <FaBoxOpen className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Store – Goods Receipt (GRN)
          </h2>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Manage incoming material receipts
          </p>
        </div>
      </div>

      {/* ── STATES ── */}
      {loading && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>Loading...</p>
      )}
      {!loading && prs.length === 0 && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          No materials pending for receipt
        </p>
      )}

      {/* ── GRN CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {prs.map((p) => {
          const received = totalReceived(p.grns);
          const pending  = p.quantity - received;
          const percent  = Math.min(((received / p.quantity) * 100), 100).toFixed(1);
          const isFull   = received >= p.quantity;

          return (
            <motion.div
              key={p._id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="relative flex flex-col justify-between p-6 rounded-2xl"
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                minHeight: "200px",
              }}
            >
              {/* Status badge */}
              <span
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: isFull ? "rgba(16,185,129,0.15)" : "rgba(99,102,241,0.15)",
                  border: `1px solid ${isFull ? "rgba(16,185,129,0.3)" : "rgba(99,102,241,0.3)"}`,
                  color: isFull ? "#34d399" : VIOLET,
                }}
              >
                {isFull ? "Complete" : "Pending"}
              </span>

              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-4 mt-2">
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
                  <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>Material</p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Ordered",  value: p.quantity },
                  { label: "Received", value: received   },
                  { label: "Pending",  value: pending    },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl px-3 py-2 text-center"
                    style={{
                      background: "rgba(99,102,241,0.07)",
                      border: `1px solid ${BORDER}`,
                    }}
                  >
                    <p className="text-xs mb-0.5" style={{ color: TEXT2 }}>{label}</p>
                    <p className="text-sm font-bold" style={{ color: TEXT1 }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1" style={{ color: TEXT2 }}>
                  <span>Progress</span>
                  <span style={{ color: isFull ? "#34d399" : VIOLET }}>{percent}%</span>
                </div>
                <div
                  className="w-full rounded-full h-1.5"
                  style={{ background: "rgba(99,102,241,0.12)" }}
                >
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      background: isFull
                        ? "linear-gradient(90deg, #10b981, #34d399)"
                        : `linear-gradient(90deg, ${INDIGO}, ${VIOLET})`,
                    }}
                  />
                </div>
              </div>

              {/* Action */}
              {isFull ? (
                <div
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    color: "#34d399",
                  }}
                >
                  ✅ Fully received · Credit cycle started
                  {p.dueDate && (
                    <span style={{ color: "#6ee7b7" }}>
                      {" "}· Due: <b>{new Date(p.dueDate).toLocaleDateString()}</b>
                    </span>
                  )}
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActivePR(p)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                    boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FaPlusCircle size={14} />
                  Add Receipt
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {activePR && (
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
                  onClick={() => setActivePR(null)}
                  className="absolute right-4 top-4 transition text-xl"
                  style={{ color: TEXT2, background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT2}
                >
                  ✕
                </button>

                <h3 className="text-lg font-bold mb-1" style={{ color: TEXT1 }}>
                  Receive Material
                </h3>
                <p className="text-sm mb-5" style={{ color: TEXT2 }}>
                  {activePR.materialName}
                </p>

                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder="Received Qty"
                    value={receivedQty}
                    onChange={(e) => setReceivedQty(e.target.value)}
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

                  <input
                    type="number"
                    placeholder="Damaged Qty"
                    value={damagedQty}
                    onChange={(e) => setDamagedQty(e.target.value)}
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = "rgba(251,191,36,0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(251,191,36,0.1)";
                      e.target.style.background = "rgba(251,191,36,0.06)";
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = BORDER;
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(99,102,241,0.06)";
                    }}
                  />

                  <textarea
                    placeholder="Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "none" }}
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

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setActivePR(null)}
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
                      onClick={submitGRN}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                        boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Save Receipt
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
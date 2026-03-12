// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import {
//   FaShoppingCart,
//   FaUser,
//   FaBoxes,
//   FaTimes,
//   FaCheckCircle,
//   FaRupeeSign
// } from "react-icons/fa";

// export default function SalesEmployee() {
//   const [stock, setStock] = useState([]);
//   const [clients, setClients] = useState([]);

//   const [selectedClient, setSelectedClient] = useState("");
//   const [qty, setQty] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [ratePerTon, setRatePerTon] = useState("");

//   const load = async () => {
//     try {
//       const s = await axios.get("/sales/stock");
//       setStock(s.data);

//       const c = await axios.get("/account/all");
//       setClients(c.data);
//     } catch {
//       toast.error("Load error");
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const sell = async () => {
//     if (!selectedClient || !qty || !ratePerTon) {
//       return toast.error("Fill all fields");
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       await axios.post(
//         "/sales/sell",
//         {
//           id: selectedItem._id,
//           qty: Number(qty),
//           clientId: selectedClient,
//           ratePerTon: Number(ratePerTon)
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       toast.success("Product sold");

//       setQty("");
//       setSelectedClient("");
//       setSelectedItem(null);
//       setRatePerTon("");

//       load();
//     } catch (err) {
//       console.log("SELL ERROR:", err.response?.data || err.message);
//       toast.error("Sale failed");
//     }

//     setLoading(false);
//   };

//   const total = Number(qty || 0) * Number(ratePerTon || 0);

//   return (
//     <div className="min-h-screen p-4 md:p-2">
//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
//           <FaShoppingCart className="text-white text-xl" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">Sales Panel</h1>
//           <p className="text-sm text-slate-500">
//             Sell finished products to clients
//           </p>
//         </div>
//       </div>

//       {/* STOCK GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
//         {stock.map((p) => (
//           <motion.div
//             key={p._id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.03 }}
//             className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-600"
//           >
//             <h3 className="text-lg font-semibold text-slate-800">
//               {p.wireType} Wire
//             </h3>

//             <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
//               <FaBoxes className="text-indigo-600" />
//               Available: <b>{p.availableQty}</b>
//             </p>

//             <button
//               onClick={() => setSelectedItem(p)}
//               className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
//             >
//               <FaShoppingCart />
//               Sell Product
//             </button>
//           </motion.div>
//         ))}
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {selectedItem && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//               onClick={() => setSelectedItem(null)}
//             />

//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             >
//               <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
//                 <button
//                   onClick={() => setSelectedItem(null)}
//                   className="absolute top-4 right-4 text-gray-400 hover:text-black"
//                 >
//                   <FaTimes />
//                 </button>

//                 <h2 className="text-lg font-semibold text-slate-800 mb-4">
//                   Sell {selectedItem.wireType} Wire
//                 </h2>

//                 {/* CLIENT */}
//                 <div className="mb-4">
//                   <label className="text-sm font-medium">Select Client</label>
//                   <div className="relative mt-1">
//                     <FaUser className="absolute left-3 top-3 text-gray-400" />
//                     <select
//                       value={selectedClient}
//                       onChange={(e) => setSelectedClient(e.target.value)}
//                       className="w-full border rounded-lg pl-10 pr-3 py-2"
//                     >
//                       <option value="">Select client</option>
//                       {clients.map((c) => (
//                         <option key={c._id} value={c._id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* QTY */}
//                 <div className="mb-4">
//                   <label className="text-sm font-medium">Quantity</label>
//                   <input
//                     type="number"
//                     value={qty}
//                     onChange={(e) => setQty(e.target.value)}
//                     className="w-full border rounded-lg px-4 py-2 mt-1"
//                   />
//                 </div>

//                 {/* RATE */}
//                 <div className="mb-4">
//                   <label className="text-sm font-medium">Rate per Ton</label>
//                   <div className="relative mt-1">
//                     <FaRupeeSign className="absolute left-3 top-3 text-gray-400" />
//                     <input
//                       type="number"
//                       value={ratePerTon}
//                       onChange={(e) => setRatePerTon(e.target.value)}
//                       className="w-full border rounded-lg pl-10 pr-3 py-2"
//                     />
//                   </div>
//                 </div>

//                 {/* TOTAL */}
//                 <div className="mb-6 text-right text-lg font-semibold text-green-700">
//                   Total: ₹{total.toLocaleString()}
//                 </div>

//                 {/* BUTTON */}
//                 <button
//                   onClick={sell}
//                   disabled={loading}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
//                 >
//                   <FaCheckCircle />
//                   {loading ? "Processing..." : "Confirm Sale"}
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaShoppingCart, FaUser, FaBoxes,
  FaTimes, FaCheckCircle, FaRupeeSign
} from "react-icons/fa";

/* ── Theme tokens ── */
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
  caretColor: VIOLET,
};

const focusOn  = e => {
  e.target.style.borderColor = "rgba(167,139,250,0.6)";
  e.target.style.boxShadow   = "0 0 0 3px rgba(99,102,241,0.15)";
  e.target.style.background  = "rgba(99,102,241,0.1)";
};
const focusOff = e => {
  e.target.style.borderColor = BORDER;
  e.target.style.boxShadow   = "none";
  e.target.style.background  = "rgba(99,102,241,0.06)";
};

export default function SalesEmployee() {
  const [stock,          setStock]          = useState([]);
  const [clients,        setClients]        = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [qty,            setQty]            = useState("");
  const [selectedItem,   setSelectedItem]   = useState(null);
  const [loading,        setLoading]        = useState(false);
  const [ratePerTon,     setRatePerTon]     = useState("");

  const load = async () => {
    try {
      const s = await axios.get("/sales/stock");
      setStock(s.data);
      const c = await axios.get("/account/all");
      setClients(c.data);
    } catch { toast.error("Load error"); }
  };

  useEffect(() => { load(); }, []);

  const sell = async () => {
    if (!selectedClient || !qty || !ratePerTon)
      return toast.error("Fill all fields");
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "/sales/sell",
        { id: selectedItem._id, qty: Number(qty), clientId: selectedClient, ratePerTon: Number(ratePerTon) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product sold");
      setQty(""); setSelectedClient(""); setSelectedItem(null); setRatePerTon("");
      load();
    } catch { toast.error("Sale failed"); }
    setLoading(false);
  };

  const total = Number(qty || 0) * Number(ratePerTon || 0);

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
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <FaShoppingCart className="text-white" size={18} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>Sales Panel</h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>Sell finished products to clients</p>
        </div>
      </div>

      {/* ── STOCK GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {stock.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative flex flex-col justify-between p-6 rounded-2xl"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderLeft: `4px solid ${INDIGO}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Avatar + title */}
            <div className="flex items-center gap-3 mb-4">
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
                <p className="font-semibold text-sm" style={{ color: TEXT1 }}>{p.wireType} Wire</p>
                <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>Finished Stock</p>
              </div>
            </div>

            {/* Available qty tile */}
            <div
              className="flex justify-between items-center px-3 py-2 rounded-xl mb-5"
              style={{ background: "rgba(99,102,241,0.07)", border: `1px solid ${BORDER}` }}
            >
              <span className="flex items-center gap-2 text-xs" style={{ color: TEXT2 }}>
                <FaBoxes style={{ color: VIOLET }} size={13} /> Available
              </span>
              <span className="text-sm font-bold" style={{ color: TEXT1 }}>{p.availableQty}</span>
            </div>

            {/* Sell button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedItem(p)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                boxShadow: `0 4px 14px rgba(99,102,241,0.35)`,
                border: "none", cursor: "pointer",
              }}
            >
              <FaShoppingCart size={13} /> Sell Product
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{   scale: 0.9,  opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="relative w-full max-w-md rounded-2xl p-6"
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
                  onClick={() => setSelectedItem(null)}
                  style={{ position: "absolute", top: 16, right: 16, color: TEXT2, background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT2}
                >
                  <FaTimes size={16} />
                </button>

                <h2 className="text-lg font-bold mb-5" style={{ color: TEXT1 }}>
                  Sell <span style={{ color: VIOLET }}>{selectedItem.wireType}</span> Wire
                </h2>

                <div className="space-y-4">

                  {/* Client */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block tracking-wide" style={{ color: TEXT2 }}>
                      Select Client
                    </label>
                    <div className="relative">
                      <FaUser size={12} style={{ color: TEXT2, position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                      <select
                        value={selectedClient}
                        onChange={e => setSelectedClient(e.target.value)}
                        style={{ ...inputStyle, paddingLeft: "36px", cursor: "pointer" }}
                        onFocus={focusOn} onBlur={focusOff}
                      >
                        <option value="" style={{ background: "#16143a", color: TEXT2 }}>Select client</option>
                        {clients.map(c => (
                          <option key={c._id} value={c._id} style={{ background: "#16143a", color: TEXT1 }}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Qty */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block tracking-wide" style={{ color: TEXT2 }}>
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={qty}
                      onChange={e => setQty(e.target.value)}
                      placeholder="Enter quantity"
                      style={inputStyle}
                      onFocus={focusOn} onBlur={focusOff}
                    />
                  </div>

                  {/* Rate */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block tracking-wide" style={{ color: TEXT2 }}>
                      Rate per Ton
                    </label>
                    <div className="relative">
                      <FaRupeeSign size={12} style={{ color: TEXT2, position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                      <input
                        type="number"
                        value={ratePerTon}
                        onChange={e => setRatePerTon(e.target.value)}
                        placeholder="₹ per ton"
                        style={{ ...inputStyle, paddingLeft: "36px" }}
                        onFocus={focusOn} onBlur={focusOff}
                      />
                    </div>
                  </div>

                  {/* Total tile */}
                  <div
                    className="flex justify-between items-center px-4 py-3 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: TEXT2 }}>Total Amount</span>
                    <span className="text-lg font-bold flex items-center gap-1" style={{ color: "#34d399" }}>
                      <FaRupeeSign size={13} /> {total.toLocaleString()}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 pt-1">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-5 py-2 rounded-xl text-sm font-medium"
                      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: TEXT2, cursor: "pointer" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={sell}
                      disabled={loading}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #059669, #10b981)",
                        boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      <FaCheckCircle size={13} />
                      {loading ? "Processing..." : "Confirm Sale"}
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
// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";
// import {
//   Package,
//   IndianRupee,
//   Hash,
//   Send
// } from "lucide-react";
// import { jwtDecode } from "jwt-decode";

// export default function PurchaseRequest() {
//   const [form, setForm] = useState({
//     materialName: "",
//     quantity: "",
//     expectedPrice: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [allowed, setAllowed] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const user = jwtDecode(token);

//     if (user.department === "Purchase") {
//       setAllowed(true);
//     } else {
//       toast.error("Only Purchase department can create requests");
//     }
//   }, []);

//   if (!allowed) {
//     return (
//       <div className="p-10 text-center text-red-500 font-semibold">
//         Access denied. Only Purchase department allowed.
//       </div>
//     );
//   }

//   const submit = async () => {
//     if (!form.materialName || !form.quantity || !form.expectedPrice) {
//       toast.warning("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post("/purchase/create", form);

//       toast.success("Purchase request sent successfully");

//       setForm({
//         materialName: "",
//         quantity: "",
//         expectedPrice: ""
//       });
//     } catch {
//       toast.error("Failed to create purchase request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center w-full h-full">
//       <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

//         {/* ================= HEADER ================= */}
//         <div className="text-center mb-8">
//           <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
//             <Package className="text-white" size={26} />
//           </div>

//           <h2 className="text-2xl font-bold text-slate-800">
//             New Purchase Request
//           </h2>
//           <p className="text-sm text-slate-500 mt-1">
//             Request raw material for manufacturing
//           </p>
//         </div>

//         {/* ================= FORM ================= */}
//         <div className="space-y-5">

//           {/* MATERIAL TYPE */}
//           <div>
//             <label className="text-sm font-medium text-slate-600 mb-1 block">
//               Material Type
//             </label>

//             <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl">
//               <Package size={18} className="text-slate-400" />
//               <select
//                 value={form.materialName}
//                 onChange={(e) =>
//                   setForm({ ...form, materialName: e.target.value })
//                 }
//                 className="bg-transparent w-full outline-none text-sm"
//               >
//                 <option value="">Select material</option>
//                 <option value="A_PLUS">A+ Grade Copper Scrap</option>
//                 <option value="A_GRADE">A Grade Copper Scrap</option>
//                 <option value="COPPER">Copper Scrap</option>
//                 <option value="MIXED">Mixed Scrap</option>
//               </select>
//             </div>
//           </div>

//           {/* QUANTITY + PRICE */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//             {/* QUANTITY */}
//             <div>
//               <label className="text-sm font-medium text-slate-600 mb-1 block">
//                 Quantity
//               </label>

//               <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl">
//                 <Hash size={18} className="text-slate-400" />
//                 <input
//                   type="number"
//                   min="1"
//                   placeholder="e.g. 100"
//                   value={form.quantity}
//                   onChange={(e) =>
//                     setForm({ ...form, quantity: e.target.value })
//                   }
//                   className="bg-transparent w-full outline-none text-sm"
//                 />
//               </div>
//             </div>

//             {/* PRICE */}
//             <div>
//               <label className="text-sm font-medium text-slate-600 mb-1 block">
//                 Expected Price (₹ / unit)
//               </label>

//               <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl">
//                 <IndianRupee size={18} className="text-slate-400" />
//                 <input
//                   type="number"
//                   min="1"
//                   placeholder="₹ per unit"
//                   value={form.expectedPrice}
//                   onChange={(e) =>
//                     setForm({ ...form, expectedPrice: e.target.value })
//                   }
//                   className="bg-transparent w-full outline-none text-sm"
//                 />
//               </div>
//             </div>

//           </div>

//           {/* SUBMIT BUTTON */}
//           <button
//             onClick={submit}
//             disabled={loading}
//             className={`
//               w-full mt-6 py-3 rounded-xl
//               flex items-center justify-center gap-2
//               font-semibold text-white transition
//               ${
//                 loading
//                   ? "bg-indigo-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               }
//             `}
//           >
//             <Send size={18} />
//             {loading ? "Submitting..." : "Submit Request"}
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { Package, IndianRupee, Hash, Send } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

/* ── Theme tokens (identical to AdminDashboard) ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

const fieldWrap = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "rgba(99,102,241,0.06)",
  border: `1px solid ${BORDER}`,
  borderRadius: "12px",
  padding: "12px 16px",
  transition: "all 0.2s",
};

const focusOn  = e => {
  e.currentTarget.style.borderColor = "rgba(167,139,250,0.6)";
  e.currentTarget.style.background  = "rgba(99,102,241,0.1)";
  e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(99,102,241,0.15)";
};
const focusOff = e => {
  e.currentTarget.style.borderColor = BORDER;
  e.currentTarget.style.background  = "rgba(99,102,241,0.06)";
  e.currentTarget.style.boxShadow   = "none";
};

export default function PurchaseRequest() {
  const [form, setForm] = useState({
    materialName: "",
    quantity: "",
    expectedPrice: ""
  });
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const user = jwtDecode(token);
    if (user.department === "Purchase") {
      setAllowed(true);
    } else {
      toast.error("Only Purchase department can create requests");
    }
  }, []);

  if (!allowed) {
    return (
      <div className="p-10 text-center font-semibold" style={{ color: "#f87171" }}>
        Access denied. Only Purchase department allowed.
      </div>
    );
  }

  const submit = async () => {
    if (!form.materialName || !form.quantity || !form.expectedPrice) {
      toast.warning("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/purchase/create", form);
      toast.success("Purchase request sent successfully");
      setForm({ materialName: "", quantity: "", expectedPrice: "" });
    } catch {
      toast.error("Failed to create purchase request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative lg:mt-8  w-full max-w-xl rounded-3xl p-8"
        style={{
          background: CARD,
          border: `1px solid ${BORDER}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top glow line */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "160px", height: "1px",
          background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
        }} />

        {/* ── HEADER ── */}
        <div className="text-center mb-8">
          <div
            className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
              boxShadow: `0 0 24px rgba(99,102,241,0.4)`,
            }}
          >
            <Package className="text-white" size={26} />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            New Purchase Request
          </h2>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Request raw material for manufacturing
          </p>
        </div>

        {/* ── FORM ── */}
        <div className="space-y-5">

          {/* Material Type */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block tracking-wide"
              style={{ color: TEXT2 }}>
              Material Type
            </label>
            <div
              style={fieldWrap}
              onFocus={focusOn}
              onBlur={focusOff}
            >
              <Package size={16} style={{ color: TEXT2, flexShrink: 0 }} />
              <select
                value={form.materialName}
                onChange={e => setForm({ ...form, materialName: e.target.value })}
                className="bg-transparent w-full outline-none text-sm"
                style={{ color: form.materialName ? TEXT1 : TEXT2, cursor: "pointer" }}
              >
                <option value=""       style={{ background: "#16143a", color: TEXT2 }}>Select material</option>
                <option value="A_PLUS" style={{ background: "#16143a", color: TEXT1 }}>A+ Grade Copper Scrap</option>
                <option value="A_GRADE"style={{ background: "#16143a", color: TEXT1 }}>A Grade Copper Scrap</option>
                <option value="COPPER" style={{ background: "#16143a", color: TEXT1 }}>Copper Scrap</option>
                <option value="MIXED"  style={{ background: "#16143a", color: TEXT1 }}>Mixed Scrap</option>
              </select>
            </div>
          </div>

          {/* Quantity + Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Quantity */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block tracking-wide"
                style={{ color: TEXT2 }}>
                Quantity
              </label>
              <div style={fieldWrap} onFocus={focusOn} onBlur={focusOff}>
                <Hash size={16} style={{ color: TEXT2, flexShrink: 0 }} />
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 100"
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                  className="bg-transparent w-full outline-none text-sm"
                  style={{ color: TEXT1, caretColor: VIOLET }}
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block tracking-wide"
                style={{ color: TEXT2 }}>
                Expected Price (₹ / unit)
              </label>
              <div style={fieldWrap} onFocus={focusOn} onBlur={focusOff}>
                <IndianRupee size={16} style={{ color: TEXT2, flexShrink: 0 }} />
                <input
                  type="number"
                  min="1"
                  placeholder="₹ per unit"
                  value={form.expectedPrice}
                  onChange={e => setForm({ ...form, expectedPrice: e.target.value })}
                  className="bg-transparent w-full outline-none text-sm"
                  style={{ color: TEXT1, caretColor: VIOLET }}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={submit}
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm text-white"
            style={{
              background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
              boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            <Send size={16} />
            {loading ? "Submitting..." : "Submit Request"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
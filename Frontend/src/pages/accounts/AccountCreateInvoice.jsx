// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import {
//   FaFileInvoice,
//   FaUser,
//   FaCubes,
//   FaRupeeSign,
//   FaCalculator,
//   FaCalendarAlt,
//   FaWhatsapp
// } from "react-icons/fa";

// export default function AccountsCreateInvoice({ saleData }) {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const isFromSale = !!saleData;   
  
//   const [invoiceData, setInvoiceData] = useState(null); // NEW

//   const [form, setForm] = useState({
//     clientId: "",
//     wireType: "",
//     qty: "",
//     rate: "",
//     creditDays: "",
//     saleId: ""   // 🔥 important
//   });

//   useEffect(() => {
//   if (!saleData) return;

//   setForm({
//     clientId: saleData.client._id,
//     wireType: saleData.wireType,
//     qty: saleData.qty,
//     rate: saleData.ratePerTon,
//     creditDays: saleData.client.creditDays,
//     saleId: saleData._id
//   });
// }, [saleData]);




//   const total = Number(form.qty || 0) * Number(form.rate || 0);

//   useEffect(() => {
//     axios.get("/account/clients").then(res => setClients(res.data));
//   }, []);

//   const selectClient = (id) => {
//     const c = clients.find(x => x._id === id);
//     setForm(prev => ({
//       ...prev,
//       clientId: id,
//       creditDays: c?.creditDays || ""
//     }));
//   };

//   const submit = async () => {
//     if (!form.clientId || !form.qty || !form.rate)
//       return toast.error("Fill all fields");

//     try {
//       setLoading(true);

//       const res = await axios.post("/account/invoice", form);

//       toast.success("Invoice generated");

//       setInvoiceData(res.data); // store invoice

//       setForm({
//         clientId: "",
//         wireType: "",
//         qty: "",
//         rate: "",
//         creditDays: "",
//         saleId: ""
//       });


//     } catch (err) {
//       toast.error("Error generating invoice");
//     }

//     setLoading(false);
//   };

//   // 📲 SEND CLIENT
//   const sendClient = () => {
//     const { clientPhone, clientName, total, invoiceNo } = invoiceData;

//     const msg = `
// *CopperJems Pvt Ltd*

// Dear ${clientName},

// Your invoice has been generated successfully.

// Invoice No: ${invoiceNo}
// Amount: ₹${total}

// Kindly contact accounts team for any queries.

// Thank you for your business.
// CopperJems Accounts Dept
// `;

//     window.open(
//       `https://wa.me/${clientPhone}?text=${encodeURIComponent(msg)}`,
//       "_blank"
//     );
//   };

//   // 📲 SEND ADMIN
//   const sendAdmin = () => {
//     const adminPhone = "919227896181";

//     const { clientName, total, invoiceNo } = invoiceData;

//     const msg = `
// *CopperJems Accounts*

// New Invoice Generated

// Client: ${clientName}
// Invoice: ${invoiceNo}
// Amount: ₹${total}

// Please record in accounts.
// `;

//     window.open(
//       `https://wa.me/${adminPhone}?text=${encodeURIComponent(msg)}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="flex justify-center px-4 pt-6 pb-10">
//       <div className="w-full max-w-4xl">

//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
//         >
//           {/* HEADER */}
//           <div className="flex items-center gap-3 mb-8">
//             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
//               <FaFileInvoice className="text-white text-lg" />
//             </div>

//             <div>
//               <h2 className="text-xl font-bold text-slate-800">
//                 Generate Invoice
//               </h2>
//               <p className="text-sm text-slate-500">
//                 CopperJems Billing System
//               </p>
//             </div>
//           </div>

//           {/* FORM */}
//           <div className="grid md:grid-cols-2 gap-5">

//             <div className="relative">
//               <FaUser className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 value={form.clientId}
//                 disabled={isFromSale}
//                 onChange={(e) => selectClient(e.target.value)}
//                 className="w-full border rounded-lg pl-10 pr-3 py-2"
//               >
//                 <option value="">Select Client</option>
//                 {clients.map(c => (
//                   <option key={c._id} value={c._id}>{c.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="relative">
//               <FaCubes className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 value={form.wireType}
//                 disabled={isFromSale}
//                 onChange={(e) => setForm({ ...form, wireType: e.target.value })}
//                 className="w-full border rounded-lg pl-10 pr-3 py-2"
//               >
//                 <option value="">Select Wire</option>
//                 <option>6mm</option>
//                 <option>9mm</option>
//                 <option>12mm</option>
//               </select>
//             </div>

//             <div className="relative">
//               <FaCalculator className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="number"
//                 disabled={isFromSale}
//                 placeholder="Qty"
//                 value={form.qty}
//                 onChange={(e) => setForm({ ...form, qty: e.target.value })}
//                 className="w-full border rounded-lg pl-10 pr-3 py-2"
//               />
//             </div>

//             <div className="relative">
//               <FaRupeeSign className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="number"
//                 disabled={isFromSale}
//                 placeholder="Rate"
//                 value={form.rate}
//                 onChange={(e) => setForm({ ...form, rate: e.target.value })}
//                 className="w-full border rounded-lg pl-10 pr-3 py-2"
//               />
//             </div>

//             <div className="relative md:col-span-2">
//               <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 value={form.creditDays}
//                 readOnly
//                 className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* TOTAL */}
//           <div className="bg-indigo-50 rounded-xl p-4 flex justify-between mt-6">
//             <span>Total</span>
//             <span className="font-bold">₹ {total}</span>
//           </div>

//           {/* GENERATE BTN */}
//           <button
//             onClick={submit}
//             disabled={loading}
//             className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg"
//           >
//             {loading ? "Generating..." : "Generate Invoice"}
//           </button>

//           {/* ACTION BUTTONS */}
//           {invoiceData && (
//             <div className="grid md:grid-cols-2 gap-4 mt-6">

//               <button
//                 onClick={sendClient}
//                 className="bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
//               >
//                 <FaWhatsapp /> Send to Client
//               </button>

//               <button
//                 onClick={sendAdmin}
//                 className="bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-2"
//               >
//                 <FaWhatsapp /> Send to Accounts
//               </button>

//             </div>
//           )}

//         </motion.div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaFileInvoice,
  FaUser,
  FaCubes,
  FaRupeeSign,
  FaCalculator,
  FaCalendarAlt,
  FaWhatsapp
} from "react-icons/fa";

/* ── Shared theme tokens ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

const fieldStyle = {
  background: "rgba(99,102,241,0.06)",
  border: `1px solid ${BORDER}`,
  color: TEXT1,
  outline: "none",
  borderRadius: "12px",
  padding: "12px 16px 12px 36px",
  width: "100%",
  fontSize: "14px",
};

const focusOn  = (e) => {
  e.target.style.borderColor = "rgba(167,139,250,0.6)";
  e.target.style.boxShadow   = "0 0 0 3px rgba(99,102,241,0.15)";
  e.target.style.background  = "rgba(99,102,241,0.1)";
  if (e.target.previousSibling) e.target.previousSibling.style.color = VIOLET;
};
const focusOff = (e) => {
  e.target.style.borderColor = BORDER;
  e.target.style.boxShadow   = "none";
  e.target.style.background  = "rgba(99,102,241,0.06)";
  if (e.target.previousSibling) e.target.previousSibling.style.color = TEXT2;
};

export default function AccountsCreateInvoice({ saleData }) {
  const [clients,     setClients]     = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const isFromSale = !!saleData;

  const [form, setForm] = useState({
    clientId: "", wireType: "", qty: "", rate: "", creditDays: "", saleId: ""
  });

  useEffect(() => {
    if (!saleData) return;
    setForm({
      clientId:   saleData.client._id,
      wireType:   saleData.wireType,
      qty:        saleData.qty,
      rate:       saleData.ratePerTon,
      creditDays: saleData.client.creditDays,
      saleId:     saleData._id,
    });
  }, [saleData]);

  useEffect(() => {
    axios.get("/account/clients").then(res => setClients(res.data));
  }, []);

  const total = Number(form.qty || 0) * Number(form.rate || 0);

  const selectClient = (id) => {
    const c = clients.find(x => x._id === id);
    setForm(prev => ({ ...prev, clientId: id, creditDays: c?.creditDays || "" }));
  };

  const submit = async () => {
    if (!form.clientId || !form.qty || !form.rate)
      return toast.error("Fill all fields");
    try {
      setLoading(true);
      const res = await axios.post("/account/invoice", form);
      toast.success("Invoice generated");
      setInvoiceData(res.data);
      setForm({ clientId: "", wireType: "", qty: "", rate: "", creditDays: "", saleId: "" });
    } catch {
      toast.error("Error generating invoice");
    }
    setLoading(false);
  };

  const sendClient = () => {
    const { clientPhone, clientName, total, invoiceNo } = invoiceData;
    const msg = `*CopperJems Pvt Ltd*\n\nDear ${clientName},\n\nYour invoice has been generated successfully.\n\nInvoice No: ${invoiceNo}\nAmount: ₹${total}\n\nKindly contact accounts team for any queries.\n\nThank you for your business.\nCopperJems Accounts Dept`;
    window.open(`https://wa.me/${clientPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendAdmin = () => {
    const adminPhone = "919227896181";
    const { clientName, total, invoiceNo } = invoiceData;
    const msg = `*CopperJems Accounts*\n\nNew Invoice Generated\n\nClient: ${clientName}\nInvoice: ${invoiceNo}\nAmount: ₹${total}\n\nPlease record in accounts.`;
    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="flex justify-center px-4 pt-6 pb-10">
      <div className="w-full max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl p-6 md:p-8"
          style={{
            background: CARD,
            border: `1px solid ${BORDER}`,
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top glow line */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "200px", height: "1px",
            background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
          }} />

          {/* ── HEADER ── */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
              }}
            >
              <FaFileInvoice className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: TEXT1 }}>
                Generate Invoice
              </h2>
              <p className="text-sm mt-1" style={{ color: TEXT2 }}>
                CopperJems Billing System
              </p>
            </div>
          </div>

          {/* ── FORM ── */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* Client select */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT2 }}>
                <FaUser size={13} />
              </span>
              <select
                value={form.clientId}
                disabled={isFromSale}
                onChange={e => selectClient(e.target.value)}
                style={{
                  ...fieldStyle,
                  cursor: isFromSale ? "not-allowed" : "pointer",
                  opacity: isFromSale ? 0.6 : 1,
                }}
                onFocus={focusOn}
                onBlur={focusOff}
              >
                <option value="" style={{ background: "#16143a", color: TEXT1 }}>Select Client</option>
                {clients.map(c => (
                  <option key={c._id} value={c._id} style={{ background: "#16143a", color: TEXT1 }}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Wire type select */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT2 }}>
                <FaCubes size={13} />
              </span>
              <select
                value={form.wireType}
                disabled={isFromSale}
                onChange={e => setForm({ ...form, wireType: e.target.value })}
                style={{
                  ...fieldStyle,
                  cursor: isFromSale ? "not-allowed" : "pointer",
                  opacity: isFromSale ? 0.6 : 1,
                }}
                onFocus={focusOn}
                onBlur={focusOff}
              >
                <option value="" style={{ background: "#16143a", color: TEXT1 }}>Select Wire</option>
                {["6mm", "9mm", "12mm"].map(w => (
                  <option key={w} style={{ background: "#16143a", color: TEXT1 }}>{w}</option>
                ))}
              </select>
            </div>

            {/* Qty */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT2 }}>
                <FaCalculator size={13} />
              </span>
              <input
                type="number"
                placeholder="Qty"
                disabled={isFromSale}
                value={form.qty}
                onChange={e => setForm({ ...form, qty: e.target.value })}
                style={{ ...fieldStyle, opacity: isFromSale ? 0.6 : 1 }}
                onFocus={focusOn}
                onBlur={focusOff}
              />
            </div>

            {/* Rate */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT2 }}>
                <FaRupeeSign size={13} />
              </span>
              <input
                type="number"
                placeholder="Rate"
                disabled={isFromSale}
                value={form.rate}
                onChange={e => setForm({ ...form, rate: e.target.value })}
                style={{ ...fieldStyle, opacity: isFromSale ? 0.6 : 1 }}
                onFocus={focusOn}
                onBlur={focusOff}
              />
            </div>

            {/* Credit Days (read-only) */}
            <div className="relative md:col-span-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT2 }}>
                <FaCalendarAlt size={13} />
              </span>
              <input
                value={form.creditDays}
                readOnly
                placeholder="Credit Days"
                style={{
                  ...fieldStyle,
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
              />
            </div>
          </div>

          {/* ── TOTAL ── */}
          <div
            className="flex justify-between items-center px-4 py-4 rounded-xl mt-6"
            style={{
              background: "rgba(99,102,241,0.08)",
              border: `1px solid ${BORDER}`,
            }}
          >
            <span className="text-sm font-medium" style={{ color: TEXT2 }}>Total Amount</span>
            <span className="text-lg font-bold flex items-center gap-1" style={{ color: VIOLET }}>
              <FaRupeeSign size={14} /> {total.toLocaleString()}
            </span>
          </div>

          {/* ── GENERATE BUTTON ── */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={submit}
            disabled={loading}
            className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
              boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            <FaFileInvoice size={14} />
            {loading ? "Generating..." : "Generate Invoice"}
          </motion.button>

          {/* ── WHATSAPP BUTTONS ── */}
          {invoiceData && (
            <div className="grid md:grid-cols-2 gap-4 mt-5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={sendClient}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #22c55e)",
                  boxShadow: "0 4px 16px rgba(34,197,94,0.3)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaWhatsapp size={15} /> Send to Client
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={sendAdmin}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #334155, #475569)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  cursor: "pointer",
                }}
              >
                <FaWhatsapp size={15} /> Send to Accounts
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
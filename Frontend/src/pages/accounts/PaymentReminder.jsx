// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import {
//   FaBell,
//   FaWhatsapp,
//   FaUser,
//   FaRupeeSign,
//   FaFileInvoice
// } from "react-icons/fa";

// export default function PaymentReminder() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     const res = await axios.get("/account/reminders");
//     setList(res.data);
//   };

//   const send = (i) => {
//     const phone = i.client.phone;

//     const msg = `*CopperJems Pvt Ltd*

// Dear ${i.client.name},

// This is a friendly reminder that your payment is due tomorrow.

// *Invoice No:* ${i.invoiceNo}
// *Amount Due:* ₹${i.total.toLocaleString()}

// Kindly arrange payment on time to avoid delay.

// Thank you,
// CopperJems Accounts Team`;

//     window.open(
//       `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
//     );
//   };

//   return (
//     <div className="p-4 md:p-2">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
//           <FaBell className="text-white text-lg" />
//         </div>

//         <div>
//           <h1 className="text-2xl font-bold">Payment Reminders</h1>
//           <p className="text-sm text-gray-500">
//             Payments due tomorrow
//           </p>
//         </div>
//       </div>

//       {/* EMPTY */}
//       {list.length === 0 && (
//         <div className="text-center text-gray-400 mt-20">
//           No reminders today
//         </div>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-6">

//         {list.map((i, index) => (
//           <motion.div
//             key={i._id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//             whileHover={{ y: -4 }}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 relative"
//           >

//             {/* BADGE */}
//             <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold">
//               Due Tomorrow
//             </span>

//             {/* CLIENT */}
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-indigo-100 p-2 rounded-lg">
//                 <FaUser className="text-indigo-600" />
//               </div>

//               <div>
//                 <p className="text-xs text-gray-400">Client</p>
//                 <p className="font-semibold text-lg">
//                   {i.client.name}
//                 </p>
//               </div>
//             </div>

//             {/* INVOICE */}
//             <div className="flex items-center gap-3 mb-3">
//               <div className="bg-blue-100 p-2 rounded-lg">
//                 <FaFileInvoice className="text-blue-600" />
//               </div>

//               <div>
//                 <p className="text-xs text-gray-400">Invoice</p>
//                 <p className="font-semibold">
//                   {i.invoiceNo}
//                 </p>
//               </div>
//             </div>

//             {/* AMOUNT */}
//             <div className="bg-slate-50 rounded-xl p-4 text-center mt-4">
//               <p className="text-xs text-gray-500">Amount Due</p>
//               <p className="text-2xl font-bold text-emerald-600 mt-1 flex items-center justify-center gap-1">
//                 <FaRupeeSign />
//                 {Number(i.total).toLocaleString()}
//               </p>
//             </div>

//             {/* BUTTON */}
//             <button
//               onClick={() => send(i)}
//               className="
//                 mt-5 w-full bg-green-600 hover:bg-green-700
//                 text-white py-3 rounded-xl flex items-center justify-center gap-2
//                 font-medium shadow
//               "
//             >
//               <FaWhatsapp />
//               Send WhatsApp Reminder
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
import {
  FaBell,
  FaWhatsapp,
  FaUser,
  FaRupeeSign,
  FaFileInvoice
} from "react-icons/fa";

/* ── Shared theme tokens ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function PaymentReminder() {
  const [list, setList] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await axios.get("/account/reminders");
    setList(res.data);
  };

  const send = (i) => {
    const phone = i.client.phone;
    const msg = `*CopperJems Pvt Ltd*

Dear ${i.client.name},

This is a friendly reminder that your payment is due tomorrow.

*Invoice No:* ${i.invoiceNo}
*Amount Due:* ₹${i.total.toLocaleString()}

Kindly arrange payment on time to avoid delay.

Thank you,
CopperJems Accounts Team`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-2"
    >

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #ea580c, #f97316)",
            boxShadow: "0 0 20px rgba(249,115,22,0.35)",
          }}
        >
          <FaBell className="text-white" size={18} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Payment Reminders
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Payments due tomorrow
          </p>
        </div>
      </div>

      {/* ── EMPTY ── */}
      {list.length === 0 && (
        <div className="text-center mt-20 text-sm" style={{ color: TEXT2 }}>
          No reminders today
        </div>
      )}

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((i, index) => (
          <motion.div
            key={i._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative flex flex-col justify-between p-6 rounded-2xl"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderLeft: "4px solid #f97316",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >

            {/* Due Tomorrow badge */}
            <span
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(249,115,22,0.12)",
                border: "1px solid rgba(249,115,22,0.3)",
                color: "#fb923c",
              }}
            >
              Due Tomorrow
            </span>

            {/* CLIENT */}
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
                  {i.client.name}
                </p>
              </div>
            </div>

            {/* INVOICE */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(96,165,250,0.1)",
                  border: "1px solid rgba(96,165,250,0.2)",
                }}
              >
                <FaFileInvoice size={14} style={{ color: "#60a5fa" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: TEXT2 }}>Invoice</p>
                <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                  {i.invoiceNo}
                </p>
              </div>
            </div>

            {/* AMOUNT */}
            <div
              className="rounded-xl p-4 text-center mb-5"
              style={{
                background: "rgba(16,185,129,0.07)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <p className="text-xs mb-1" style={{ color: TEXT2 }}>Amount Due</p>
              <p
                className="text-2xl font-bold flex items-center justify-center gap-1"
                style={{ color: "#34d399" }}
              >
                <FaRupeeSign size={18} />
                {Number(i.total).toLocaleString()}
              </p>
            </div>

            {/* BUTTON */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => send(i)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                boxShadow: "0 4px 16px rgba(34,197,94,0.3)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaWhatsapp size={15} />
              Send WhatsApp Reminder
            </motion.button>

          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
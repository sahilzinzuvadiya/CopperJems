// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import {
//   FaRupeeSign,
//   FaUser,
//   FaBoxOpen,
//   FaClock
// } from "react-icons/fa";

// export default function PendingPayments() {
//   const [data, setData] = useState([]);
//   const [totalPending, setTotalPending] = useState(0);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const res = await axios.get("/account/pending-payments");
//       const list = res.data || [];
//       setData(list);

//       const total = list.reduce(
//         (sum, x) => sum + Number(x.pendingAmount || 0),
//         0
//       );
//       setTotalPending(total);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="p-1 md:p-2 space-y-6 max-w-6xl mx-auto">

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

//         {/* LEFT */}
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
//             <FaClock className="text-white" />
//           </div>

//           <div>
//             <h1 className="text-xl md:text-[17px] lg:text-2xl sm:text-2xl font-bold">
//               Pending Client Payments
//             </h1>
//             <p className="text-sm text-gray-500">
//               Unpaid invoices
//             </p>
//           </div>
//         </div>

//         {/* TOTAL */}
//      <div className="flex justify-end w-full">
//   <div
//     className="
//       bg-gradient-to-r from-red-500 to-orange-500
//       text-white
//       px-4 py-2
//       rounded-2xl shadow-xl
//       flex items-center gap-2
//       w-fit
//       max-w-[90vw]
//     "
//   >
//     <FaRupeeSign className="shrink-0" />
//     <span className="whitespace-nowrap">
//       {totalPending.toLocaleString()}
//     </span>
//   </div>
// </div>


//       </div>

//       {/* EMPTY */}
//       {data.length === 0 && (
//         <p className="text-center text-gray-400 mt-20">
//           No pending payments
//         </p>
//       )}

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

//         {/* DESKTOP HEADER */}
//         <div className="hidden md:grid grid-cols-4 px-6 py-4 bg-gray-50 text-sm font-semibold text-gray-600">
//           <div>Client</div>
//           <div>Wire</div>
//           <div>Qty</div>
//           <div className="text-right">Pending</div>
//         </div>

//         {/* ROWS */}
//         {data.map((p, i) => (
//           <motion.div
//             key={p._id}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.03 }}

//             className="
//               border-b last:border-0
//               px-4 py-4
//               grid grid-cols-1
//               md:grid-cols-4
//               gap-3 md:gap-0
//               items-center
//               hover:bg-gray-50
//             "
//           >
//             {/* CLIENT */}
//             <div className="flex items-center gap-3">
//               <div className="bg-red-100 p-2 rounded-lg">
//                 <FaUser className="text-red-600" />
//               </div>
//               <div className="font-medium">
//                 {p.clientName || "-"}
//               </div>
//             </div>

//             {/* WIRE */}
//             <div className="flex items-center gap-2 text-gray-600">
//               <FaBoxOpen />
//               {p.wireType || "-"}
//             </div>

//             {/* QTY */}
//             <div className="font-medium">
//               Qty: {p.qty || 0}
//             </div>

//             {/* AMOUNT */}
//             <div className="flex md:justify-end items-center gap-1 font-bold text-red-600">
//               <FaRupeeSign />
//               {Number(p.pendingAmount || 0).toLocaleString()}
//             </div>

//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { FaRupeeSign, FaUser, FaBoxOpen, FaClock } from "react-icons/fa";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function PendingPayments() {
  const [data,         setData]         = useState([]);
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res  = await axios.get("/account/pending-payments");
      const list = res.data || [];
      setData(list);
      setTotalPending(list.reduce((sum, x) => sum + Number(x.pendingAmount || 0), 0));
    } catch (err) { console.log(err); }
  };

  return (
    <div className="p-1 md:p-2 space-y-6 max-w-6xl mx-auto">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              boxShadow: "0 0 20px rgba(239,68,68,0.4)",
            }}
          >
            <FaClock className="text-white" />
          </div>
          <div className="w-80">
            <h1 className="w-full text-xl lg:text-2xl font-bold" style={{ color: TEXT1 }}>
              Pending Client Payments
            </h1>
            <p className="text-sm mt-0.5" style={{ color: TEXT2 }}>
              Unpaid invoices
            </p>
          </div>
        </div>

        {/* Total badge */}
        <div className="flex justify-end w-full">
          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl w-fit"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              boxShadow: "0 0 16px rgba(239,68,68,0.15)",
              color: "#f87171",
              fontWeight: 700,
            }}
          >
            <FaRupeeSign className="shrink-0" />
            <span className="whitespace-nowrap">
              {totalPending.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ── EMPTY ── */}
      {data.length === 0 && (
        <p className="text-center mt-20 text-sm" style={{ color: TEXT2 }}>
          No pending payments
        </p>
      )}

      {/* ── TABLE ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: CARD,
          border: `1px solid ${BORDER}`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Desktop header */}
        <div
          className="hidden md:grid grid-cols-4 px-6 py-4 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(99,102,241,0.07)",
            borderBottom: `1px solid ${BORDER}`,
            color: TEXT2,
          }}
        >
          <div>Client</div>
          <div>Wire</div>
          <div>Qty</div>
          <div className="text-right">Pending</div>
        </div>

        {/* Rows */}
        {data.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 items-center px-6 py-4"
            style={{
              borderBottom: i < data.length - 1 ? `1px solid ${BORDER}` : "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {/* Client */}
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.25)",
                }}
              >
                <FaUser style={{ color: "#f87171" }} />
              </div>
              <span className="font-medium text-sm" style={{ color: TEXT1 }}>
                {p.clientName || "-"}
              </span>
            </div>

            {/* Wire */}
            <div className="flex items-center gap-2 text-sm" style={{ color: TEXT2 }}>
              <FaBoxOpen style={{ color: VIOLET }} />
              {p.wireType || "-"}
            </div>

            {/* Qty */}
            <div className="text-sm font-medium" style={{ color: TEXT1 }}>
              Qty: {p.qty || 0}
            </div>

            {/* Amount */}
            <div
              className="flex md:justify-end items-center gap-1 font-bold text-sm"
              style={{ color: "#f87171" }}
            >
              <FaRupeeSign />
              {Number(p.pendingAmount || 0).toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
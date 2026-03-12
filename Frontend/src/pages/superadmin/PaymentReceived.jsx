// // import { useEffect, useState } from "react";
// // import axios from "../../api/axios";
// // import { motion } from "framer-motion";
// // import {
// //     FaRupeeSign,
// //     FaFileInvoice,
// //     FaUser,
// //     FaCalendarAlt,
// //     FaMoneyCheckAlt
// // } from "react-icons/fa";

// // export default function PaymentsReceived() {
// //     const [data, setData] = useState([]);
// //     const [total, setTotal] = useState(0);

// //     useEffect(() => {
// //         axios.get("/account/payments-received").then(res => {
// //             setData(res.data.payments || []);
// //             setTotal(res.data.totalReceived || 0);
// //         });
// //     }, []);

// //     const formatDate = (d) => {
// //         if (!d) return "-";
// //         const date = new Date(d);
// //         if (isNaN(date)) return "-";
// //         return date.toLocaleDateString("en-IN");
// //     };

// //     return (
// //         <div className="p-4 md:p-2">

// //             {/* HEADER */}
// //             <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">

// //                 <h1 className="text-2xl font-bold flex items-center gap-3">
// //                     <span className="bg-green-100 p-2 rounded-lg">
// //                         <FaMoneyCheckAlt className="text-green-600 text-lg" />
// //                     </span>
// //                     Payments Received
// //                 </h1>

// //                 <motion.div
// //                     initial={{ scale: 0.8 }}
// //                     animate={{ scale: 1 }}
// //                     className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 w-fit"
// //                 >
// //                     <FaRupeeSign />
// //                     ₹ {total.toLocaleString()}
// //                 </motion.div>
// //             </div>

// //             {/* LIST */}
// //             <div className="space-y-4">

// //                 {data.map((p, i) => (
// //                     <motion.div
// //                         key={p._id}
// //                         initial={{ opacity: 0, y: 20 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         transition={{ delay: i * 0.05 }}
// //                         whileHover={{ scale: 1.01 }}
// //                         className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4 md:p-5 transition"
// //                     >
// //                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">

// //                             {/* INVOICE */}
// //                             <div className="flex items-center gap-3">
// //                                 <div className="bg-indigo-100 p-2 rounded-lg">
// //                                     <FaFileInvoice className="text-indigo-600" />
// //                                 </div>
// //                                 <div>
// //                                     <p className="text-xs text-gray-400">Invoice</p>
// //                                     <p className="font-semibold">{p.invoiceNo}</p>
// //                                 </div>
// //                             </div>

// //                             {/* CLIENT */}
// //                             <div className="flex items-center gap-3">
// //                                 <div className="bg-blue-100 p-2 rounded-lg">
// //                                     <FaUser className="text-blue-600" />
// //                                 </div>
// //                                 <div>
// //                                     <p className="text-xs text-gray-400">Client</p>
// //                                     <p className="font-semibold">{p.client?.name || "-"}</p>
// //                                 </div>
// //                             </div>

// //                             {/* AMOUNT */}
// //                             <div className="flex items-center gap-3">
// //                                 <div className="bg-green-100 p-2 rounded-lg">
// //                                     <FaRupeeSign className="text-green-600" />
// //                                 </div>
// //                                 <div>
// //                                     <p className="text-xs text-gray-400">Amount</p>
// //                                     <p className="font-bold text-green-600">
// //                                         ₹ {p.total?.toLocaleString()}
// //                                     </p>
// //                                 </div>
// //                             </div>

// //                             {/* DATE */}
// //                             <div className="flex items-center gap-3">
// //                                 <div className="bg-orange-100 p-2 rounded-lg">
// //                                     <FaCalendarAlt className="text-orange-600" />
// //                                 </div>
// //                                 <div>
// //                                     <p className="text-xs text-gray-400">Date</p>
// //                                     <p className="font-semibold">
// //                                         {formatDate(p.updatedAt || p.createdAt)}
// //                                     </p>
// //                                 </div>
// //                             </div>

// //                         </div>
// //                     </motion.div>
// //                 ))}

// //                 {data.length === 0 && (
// //                     <div className="text-center text-gray-400 py-10">
// //                         No payments received yet
// //                     </div>
// //                 )}

// //             </div>
// //         </div>
// //     );
// // }
// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import {
//   FaRupeeSign,
//   FaFileInvoice,
//   FaUser,
//   FaCalendarAlt,
//   FaMoneyCheckAlt
// } from "react-icons/fa";

// export default function PaymentsReceived() {
//   const [data, setData] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     axios.get("/account/payments-received").then(res => {
//       setData(res.data.payments || []);
//       setTotal(res.data.totalReceived || 0);
//     });
//   }, []);

//   const formatDate = (d) => {
//     if (!d) return "-";
//     const date = new Date(d);
//     if (isNaN(date)) return "-";
//     return date.toLocaleDateString("en-IN");
//   };

//   return (
//     <div className="p-4 md:p-1 max-w-6xl mx-auto">

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">

//         <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
//           <span className="bg-green-100 p-2 rounded-lg">
//             <FaMoneyCheckAlt className="text-green-600 text-lg" />
//           </span>
//           Payments Received
//         </h1>

//         <div className="flex justify-end w-full">
//   <div
//     className="
//       bg-gradient-to-r from-green-500 to-emerald-600
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
//       {total.toLocaleString()}
//     </span>
//   </div>
// </div>
//       </div>

//       {/* LIST */}
//       <div className="space-y-4">

//         {data.map((p, i) => (
//           <motion.div
//             key={p._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.04 }}
//             whileHover={{ scale: 1.01 }}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-5 transition"
//           >

//             {/* GRID */}
//             <div className="
//               grid
//               grid-cols-1
//               sm:grid-cols-2
//               lg:grid-cols-4
//               gap-4
//               items-center
//             ">

//               {/* INVOICE */}
//               <div className="flex items-center gap-3">
//                 <div className="bg-indigo-100 p-2 rounded-lg">
//                   <FaFileInvoice className="text-indigo-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">Invoice</p>
//                   <p className="font-semibold text-sm sm:text-base">
//                     {p.invoiceNo}
//                   </p>
//                 </div>
//               </div>

//               {/* CLIENT */}
//               <div className="flex items-center gap-3">
//                 <div className="bg-blue-100 p-2 rounded-lg">
//                   <FaUser className="text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">Client</p>
//                   <p className="font-semibold text-sm sm:text-base">
//                     {p.client?.name || "-"}
//                   </p>
//                 </div>
//               </div>

//               {/* AMOUNT */}
//               <div className="flex items-center gap-3">
//                 <div className="bg-green-100 p-2 rounded-lg">
//                   <FaRupeeSign className="text-green-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">Amount</p>
//                   <p className="font-bold text-green-600 text-sm sm:text-base">
//                     ₹ {p.total?.toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               {/* DATE */}
//               <div className="flex items-center gap-3">
//                 <div className="bg-orange-100 p-2 rounded-lg">
//                   <FaCalendarAlt className="text-orange-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">Date</p>
//                   <p className="font-semibold text-sm sm:text-base">
//                     {formatDate(p.updatedAt || p.createdAt)}
//                   </p>
//                 </div>
//               </div>

//             </div>
//           </motion.div>
//         ))}

//         {data.length === 0 && (
//           <div className="text-center text-gray-400 py-12">
//             No payments received yet
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FaRupeeSign, FaFileInvoice, FaUser,
  FaCalendarAlt, FaMoneyCheckAlt
} from "react-icons/fa";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function PaymentsReceived() {
  const [data,  setData]  = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get("/account/payments-received").then(res => {
      setData(res.data.payments  || []);
      setTotal(res.data.totalReceived || 0);
    });
  }, []);

  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    if (isNaN(date)) return "-";
    return date.toLocaleDateString("en-IN");
  };

  const iconBox = (color, bg) => ({
    background: bg,
    border: `1px solid ${color}40`,
    borderRadius: "10px",
    padding: "8px",
    color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  });

  return (
    <div className="p-4 md:p-1 max-w-6xl mx-auto">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">

        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 0 20px rgba(16,185,129,0.4)",
            }}
          >
            <FaMoneyCheckAlt className="text-white text-lg" />
          </div>
          <div className="w-80">
            <h1 className="text-xl sm:text-2xl font-bold" style={{ color: TEXT1 }}>
              Payments Received
            </h1>
            <p className="text-sm mt-0.5" style={{ color: TEXT2 }}>
              Completed client transactions
            </p>
          </div>
        </div>

        {/* Total badge */}
        <div className="flex justify-end w-full">
          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl w-fit"
            style={{
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              boxShadow: "0 0 16px rgba(16,185,129,0.15)",
              color: "#34d399",
              fontWeight: 700,
            }}
          >
            <FaRupeeSign className="shrink-0" />
            <span className="whitespace-nowrap">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ── LIST ── */}
      <div className="space-y-4">
        {data.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.01 }}
            className="p-4 sm:p-5 rounded-2xl transition-all"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(16,185,129,0.1)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">

              {/* Invoice */}
              <div className="flex items-center gap-3">
                <div style={iconBox(VIOLET, "rgba(99,102,241,0.12)")}>
                  <FaFileInvoice />
                </div>
                <div>
                  <p className="text-xs" style={{ color: TEXT2 }}>Invoice</p>
                  <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                    {p.invoiceNo}
                  </p>
                </div>
              </div>

              {/* Client */}
              <div className="flex items-center gap-3">
                <div style={iconBox("#60a5fa", "rgba(96,165,250,0.12)")}>
                  <FaUser />
                </div>
                <div>
                  <p className="text-xs" style={{ color: TEXT2 }}>Client</p>
                  <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                    {p.client?.name || "-"}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-3">
                <div style={iconBox("#34d399", "rgba(16,185,129,0.12)")}>
                  <FaRupeeSign />
                </div>
                <div>
                  <p className="text-xs" style={{ color: TEXT2 }}>Amount</p>
                  <p className="font-bold text-sm" style={{ color: "#34d399" }}>
                    ₹ {p.total?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3">
                <div style={iconBox("#fb923c", "rgba(249,115,22,0.12)")}>
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-xs" style={{ color: TEXT2 }}>Date</p>
                  <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                    {formatDate(p.updatedAt || p.createdAt)}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-12 text-sm" style={{ color: TEXT2 }}>
            No payments received yet
          </div>
        )}
      </div>
    </div>
  );
}
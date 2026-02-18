// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import {
//     FaRupeeSign,
//     FaFileInvoice,
//     FaUser,
//     FaCalendarAlt,
//     FaMoneyCheckAlt
// } from "react-icons/fa";

// export default function PaymentsReceived() {
//     const [data, setData] = useState([]);
//     const [total, setTotal] = useState(0);

//     useEffect(() => {
//         axios.get("/account/payments-received").then(res => {
//             setData(res.data.payments || []);
//             setTotal(res.data.totalReceived || 0);
//         });
//     }, []);

//     const formatDate = (d) => {
//         if (!d) return "-";
//         const date = new Date(d);
//         if (isNaN(date)) return "-";
//         return date.toLocaleDateString("en-IN");
//     };

//     return (
//         <div className="p-4 md:p-2">

//             {/* HEADER */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">

//                 <h1 className="text-2xl font-bold flex items-center gap-3">
//                     <span className="bg-green-100 p-2 rounded-lg">
//                         <FaMoneyCheckAlt className="text-green-600 text-lg" />
//                     </span>
//                     Payments Received
//                 </h1>

//                 <motion.div
//                     initial={{ scale: 0.8 }}
//                     animate={{ scale: 1 }}
//                     className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 w-fit"
//                 >
//                     <FaRupeeSign />
//                     ₹ {total.toLocaleString()}
//                 </motion.div>
//             </div>

//             {/* LIST */}
//             <div className="space-y-4">

//                 {data.map((p, i) => (
//                     <motion.div
//                         key={p._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: i * 0.05 }}
//                         whileHover={{ scale: 1.01 }}
//                         className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4 md:p-5 transition"
//                     >
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">

//                             {/* INVOICE */}
//                             <div className="flex items-center gap-3">
//                                 <div className="bg-indigo-100 p-2 rounded-lg">
//                                     <FaFileInvoice className="text-indigo-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-400">Invoice</p>
//                                     <p className="font-semibold">{p.invoiceNo}</p>
//                                 </div>
//                             </div>

//                             {/* CLIENT */}
//                             <div className="flex items-center gap-3">
//                                 <div className="bg-blue-100 p-2 rounded-lg">
//                                     <FaUser className="text-blue-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-400">Client</p>
//                                     <p className="font-semibold">{p.client?.name || "-"}</p>
//                                 </div>
//                             </div>

//                             {/* AMOUNT */}
//                             <div className="flex items-center gap-3">
//                                 <div className="bg-green-100 p-2 rounded-lg">
//                                     <FaRupeeSign className="text-green-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-400">Amount</p>
//                                     <p className="font-bold text-green-600">
//                                         ₹ {p.total?.toLocaleString()}
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* DATE */}
//                             <div className="flex items-center gap-3">
//                                 <div className="bg-orange-100 p-2 rounded-lg">
//                                     <FaCalendarAlt className="text-orange-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-400">Date</p>
//                                     <p className="font-semibold">
//                                         {formatDate(p.updatedAt || p.createdAt)}
//                                     </p>
//                                 </div>
//                             </div>

//                         </div>
//                     </motion.div>
//                 ))}

//                 {data.length === 0 && (
//                     <div className="text-center text-gray-400 py-10">
//                         No payments received yet
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FaRupeeSign,
  FaFileInvoice,
  FaUser,
  FaCalendarAlt,
  FaMoneyCheckAlt
} from "react-icons/fa";

export default function PaymentsReceived() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get("/account/payments-received").then(res => {
      setData(res.data.payments || []);
      setTotal(res.data.totalReceived || 0);
    });
  }, []);

  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    if (isNaN(date)) return "-";
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div className="p-4 md:p-1 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">

        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
          <span className="bg-green-100 p-2 rounded-lg">
            <FaMoneyCheckAlt className="text-green-600 text-lg" />
          </span>
          Payments Received
        </h1>

        <div className="flex justify-end w-full">
  <div
    className="
      bg-gradient-to-r from-green-500 to-emerald-600
      text-white
      px-4 py-2
      rounded-2xl shadow-xl
      flex items-center gap-2
      w-fit
      max-w-[90vw]
    "
  >
    <FaRupeeSign className="shrink-0" />
    <span className="whitespace-nowrap">
      {total.toLocaleString()}
    </span>
  </div>
</div>
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {data.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-5 transition"
          >

            {/* GRID */}
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4
              items-center
            ">

              {/* INVOICE */}
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FaFileInvoice className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Invoice</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {p.invoiceNo}
                  </p>
                </div>
              </div>

              {/* CLIENT */}
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaUser className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Client</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {p.client?.name || "-"}
                  </p>
                </div>
              </div>

              {/* AMOUNT */}
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FaRupeeSign className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Amount</p>
                  <p className="font-bold text-green-600 text-sm sm:text-base">
                    ₹ {p.total?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* DATE */}
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <FaCalendarAlt className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {formatDate(p.updatedAt || p.createdAt)}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        ))}

        {data.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No payments received yet
          </div>
        )}
      </div>
    </div>
  );
}

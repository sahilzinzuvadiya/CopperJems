// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import {
//     FaIndustry,
//     FaCheckCircle,
//     FaUser,
//     FaCubes
// } from "react-icons/fa";

// export default function ProductionShow() {
//     const [list, setList] = useState([]);

//     useEffect(() => {
//         axios.get("/production/completed").then(res => setList(res.data));
//     }, []);

//     return (
//         <div className="min-h-screen p-4 md:p-2">

//             {/* HEADER */}
//             <div className="flex items-center gap-3 mb-8">
//                 <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
//                     <FaIndustry className="text-white text-xl" />
//                 </div>
//                 <div>
//                     <h1 className="text-2xl max-sm:text-xl font-bold text-slate-800">
//                         Completed Production
//                     </h1>
//                     <p className="text-sm text-slate-500">
//                         Finished manufacturing jobs
//                     </p>
//                 </div>
//             </div>

//             {/* LIST */}
//             <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
//                 {list.map((p) => (
//                     <motion.div
//                         key={p._id}
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         whileHover={{ scale: 1.03 }}
//                         className="relative bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600"
//                     >

//                         {/* ⭐ TOP RIGHT BADGE */}
//                         <span className="
//     absolute top-4 right-4
//     flex items-center gap-1
//     text-xs font-semibold
//     bg-green-100 text-green-700
//     px-3 py-1 rounded-full
//   ">
//                             <FaCheckCircle size={12} />
//                             Completed
//                         </span>

//                         {/* TITLE */}
//                         <h3 className="text-lg font-semibold text-slate-800">
//                             {p.wireType} Wire
//                         </h3>

//                         {/* RAW */}
//                         <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
//                             <FaCubes className="text-indigo-600" />
//                             Raw Used: <b>{p.rawQtyUsed}</b>
//                         </p>

//                         {/* OUTPUT */}
//                         <p className="text-sm mt-2">
//                             Output: <b>{p.outputQty}</b>
//                         </p>

//                         {/* EMPLOYEE */}
//                         <p className="text-sm mt-3 flex items-center gap-2">
//                             <FaUser className="text-gray-500" />
//                             Employee: <b>{p.completedBy?.name || "Unknown"}</b>
//                         </p>

//                         {/* DATE */}
//                         <p className="text-xs text-gray-400 mt-3">
//                             {new Date(p.completedAt).toLocaleString()}
//                         </p>

//                     </motion.div>

//                 ))}
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { FaIndustry, FaCheckCircle, FaUser, FaCubes } from "react-icons/fa";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function ProductionShow() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("/production/completed").then(res => setList(res.data));
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-2">

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <FaIndustry className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl max-sm:text-xl font-bold" style={{ color: TEXT1 }}>
            Completed Production
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Finished manufacturing jobs
          </p>
        </div>
      </div>

      {/* ── EMPTY ── */}
      {list.length === 0 && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          No completed production found
        </p>
      )}

      {/* ── CARDS ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {list.map((p) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="relative p-6 rounded-2xl"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderLeft: "4px solid #10b981",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Completed badge */}
            <span
              className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#34d399",
              }}
            >
              <FaCheckCircle size={11} />
              Completed
            </span>

            {/* Wire type */}
            <h3 className="text-base font-semibold mb-4" style={{ color: TEXT1 }}>
              {p.wireType} Wire
            </h3>

            {/* Details */}
            <div
              className="space-y-3 text-sm py-4"
              style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
            >
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2" style={{ color: TEXT2 }}>
                  <FaCubes style={{ color: VIOLET }} />
                  Raw Used
                </span>
                <span className="font-semibold" style={{ color: TEXT1 }}>{p.rawQtyUsed}</span>
              </div>

              <div className="flex justify-between items-center">
                <span style={{ color: TEXT2 }}>Output Qty</span>
                <span className="font-semibold" style={{ color: TEXT1 }}>{p.outputQty}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2" style={{ color: TEXT2 }}>
                  <FaUser style={{ color: TEXT2 }} />
                  Employee
                </span>
                <span className="font-semibold" style={{ color: VIOLET }}>
                  {p.completedBy?.name || "Unknown"}
                </span>
              </div>
            </div>

            {/* Date */}
            <p className="text-xs mt-3" style={{ color: TEXT2 }}>
              {new Date(p.completedAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
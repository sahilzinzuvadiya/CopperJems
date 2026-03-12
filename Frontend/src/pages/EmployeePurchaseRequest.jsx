// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { motion } from "framer-motion";
// import {
//   ShoppingCart,
//   Boxes,
//   IndianRupee,
//   CalendarDays
// } from "lucide-react";

// export default function MyPurchaseRequests() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     const res = await axios.get("/purchase/my"); // employee PR API
//     setList(res.data);
//   };

//   return (
//     <div className="p-2 md:p-2 min-h-screen">

//       {/* HEADER */}
//       <div className="flex items-center gap-4 mb-8">
//         <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
//           <ShoppingCart className="text-white" size={26} />
//         </div>

//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">
//             My Purchase Requests
//           </h1>
//           <p className="text-slate-500 text-sm">
//             Track all your material requests
//           </p>
//         </div>
//       </div>

//       {/* EMPTY */}
//       {list.length === 0 && (
//         <div className="bg-white rounded-xl shadow p-10 text-center text-slate-500">
//           No requests yet
//         </div>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">

//         {list.map((p, i) => (
//           <motion.div
//             key={p._id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             whileHover={{ y: -6 }}
//             className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-500 relative"
//           >

//             {/* STATUS BADGE */}
//             <span className="absolute top-4 right-4 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
//               {p.status.replaceAll("_", " ")}
//             </span>

//             {/* TITLE */}
//             <h3 className="text-lg font-semibold text-slate-800">
//               {p.materialName}
//             </h3>

//             {/* QTY */}
//             <p className="text-sm mt-3 flex items-center gap-2 text-slate-600">
//               <Boxes size={16} className="text-indigo-600" />
//               Qty: <b>{p.quantity}</b>
//             </p>

//             {/* PRICE */}
//             <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
//               <IndianRupee size={16} className="text-emerald-600" />
//               Expected Price: <b>₹{p.expectedPrice}</b>
//             </p>

//             {/* TOTAL */}
//             <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
//               <IndianRupee size={16} className="text-emerald-600" />
//               Total: <b>₹{p.expectedPrice * p.quantity}</b>
//             </p>

//             {/* DATE */}
//             <p className="text-xs text-slate-400 mt-4 flex items-center gap-2">
//               <CalendarDays size={14} />
//               {new Date(p.createdAt).toLocaleString()}
//             </p>

//           </motion.div>
//         ))}

//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Boxes,
  IndianRupee,
  CalendarDays
} from "lucide-react";

/* ── Theme tokens (identical to AdminDashboard) ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function MyPurchaseRequests() {
  const [list, setList] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await axios.get("/purchase/my");
    setList(res.data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 min-h-screen"
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
          <ShoppingCart className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            My Purchase Requests
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Track all your material requests
          </p>
        </div>
      </div>

      {/* ── EMPTY ── */}
      {list.length === 0 && (
        <div
          className="rounded-xl p-10 text-center text-sm"
          style={{
            background: CARD,
            border: `1px solid ${BORDER}`,
            color: TEXT2,
          }}
        >
          No requests yet
        </div>
      )}

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {list.map((p, i) => (
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
            {/* Status badge */}
            <span
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(99,102,241,0.15)",
                border: `1px solid rgba(99,102,241,0.3)`,
                color: VIOLET,
              }}
            >
              {p.status.replaceAll("_", " ")}
            </span>

            {/* Material name */}
            <h3 className="text-base font-semibold mt-1 mb-4" style={{ color: TEXT1 }}>
              {p.materialName}
            </h3>

            {/* Detail rows */}
            <div
              className="space-y-2.5 text-sm py-4"
              style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
            >
              {[
                {
                  icon: <Boxes size={14} style={{ color: VIOLET }} />,
                  label: "Qty",
                  value: p.quantity,
                },
                {
                  icon: <IndianRupee size={14} style={{ color: "#34d399" }} />,
                  label: "Expected Price",
                  value: `₹${p.expectedPrice}`,
                },
                {
                  icon: <IndianRupee size={14} style={{ color: "#34d399" }} />,
                  label: "Total",
                  value: `₹${(p.expectedPrice * p.quantity).toLocaleString()}`,
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="flex items-center gap-2" style={{ color: TEXT2 }}>
                    {icon} {label}
                  </span>
                  <span className="font-semibold" style={{ color: TEXT1 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Date */}
            <p className="text-xs mt-3 flex items-center gap-2" style={{ color: TEXT2 }}>
              <CalendarDays size={13} />
              {new Date(p.createdAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import {
//   FaCheckCircle,
//   FaIndustry,
//   FaBoxes
// } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function SalesAdmin() {
//   const [list, setList] = useState([]);
//   const [loadingId, setLoadingId] = useState(null);

//   const load = () => {
//     axios.get("/sales/pending").then(res => setList(res.data));
//     // console.log("API DATA:", res.data); 
//   };

//   useEffect(load, []);

//   const approve = async (id) => {
//     try {
//       setLoadingId(id);

//       await axios.put("/sales/approve/" + id);

//       toast.success("Stock approved for sale");

//       setList(prev => prev.filter(i => i._id !== id));
//     } catch {
//       toast.error("Error approving");
//     }

//     setLoadingId(null);
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-2">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
//           <FaIndustry className="text-white text-xl" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">
//             Sales Admin Panel
//           </h1>
//           <p className="text-sm text-slate-500">
//             Approve finished goods for sale
//           </p>
//         </div>
//       </div>

//       {/* EMPTY */}
//       {list.length === 0 && (
//         <div className="text-center mt-20 text-slate-500">
//           No pending stock
//         </div>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {list.map((p) => (
//           <motion.div
//             key={p._id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.03 }}
//             className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-600 relative"
//           >

//             {/* BADGE */}
//             <span className="absolute top-4 right-4 text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
//               Pending Approval
//             </span>

//             {/* TITLE */}
//             <h3 className="text-lg font-semibold text-slate-800">
//               {p.wireType} Wire
//             </h3>

//             {/* QTY */}
//             <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
//               <FaBoxes className="text-indigo-600" />
//               Produced Qty: <b>{p.totalQty}</b>
//             </p>

//             {/* BUTTON */}
//             <button
//               onClick={() => approve(p._id)}
//               disabled={loadingId === p._id}
//               className="
//                 mt-6 w-full flex items-center justify-center gap-2
//                 bg-green-600 hover:bg-green-700
//                 text-white py-2 rounded-lg
//                 transition
//               "
//             >
//               <FaCheckCircle />
//               {loadingId === p._id ? "Approving..." : "Approve for Sale"}
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
  FaCheckCircle,
  FaIndustry,
  FaBoxes
} from "react-icons/fa";
import { toast } from "react-toastify";

/* ── Shared theme tokens (same as AdminList, GRNReceive, ManufactureCreate) ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function SalesAdmin() {
  const [list, setList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const load = () => {
    axios.get("/sales/pending").then(res => setList(res.data));
  };

  useEffect(load, []);

  const approve = async (id) => {
    try {
      setLoadingId(id);
      await axios.put("/sales/approve/" + id);
      toast.success("Stock approved for sale");
      setList(prev => prev.filter(i => i._id !== id));
    } catch {
      toast.error("Error approving");
    }
    setLoadingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen"
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
          <FaIndustry className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Sales Admin Panel
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Approve finished goods for sale
          </p>
        </div>
      </div>

      {/* ── EMPTY ── */}
      {list.length === 0 && (
        <div className="text-center mt-20 text-sm" style={{ color: TEXT2 }}>
          No pending stock
        </div>
      )}

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((p) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="relative flex flex-col justify-between p-6 rounded-2xl"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderLeft: `4px solid ${INDIGO}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              minHeight: "180px",
            }}
          >
            {/* Pending badge */}
            <span
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(251,191,36,0.12)",
                border: "1px solid rgba(251,191,36,0.3)",
                color: "#fbbf24",
              }}
            >
              Pending Approval
            </span>

            {/* Avatar + title */}
            <div className="flex items-center gap-4 mb-4 mt-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                  boxShadow: `0 0 16px rgba(99,102,241,0.35)`,
                }}
              >
                {p.wireType?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                  {p.wireType} Wire
                </p>
                <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>Finished Good</p>
              </div>
            </div>

            {/* Qty badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm mb-5"
              style={{
                background: "rgba(99,102,241,0.07)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <FaBoxes style={{ color: VIOLET }} size={13} />
              <span style={{ color: TEXT2 }}>Produced Qty:</span>
              <span className="font-bold" style={{ color: TEXT1 }}>{p.totalQty}</span>
            </div>

            {/* Approve button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => approve(p._id)}
              disabled={loadingId === p._id}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{
                background: loadingId === p._id
                  ? "rgba(16,185,129,0.4)"
                  : "linear-gradient(135deg, #10b981, #34d399)",
                boxShadow: loadingId === p._id ? "none" : "0 4px 16px rgba(16,185,129,0.3)",
                border: "none",
                cursor: loadingId === p._id ? "not-allowed" : "pointer",
                opacity: loadingId === p._id ? 0.7 : 1,
              }}
            >
              <FaCheckCircle size={14} />
              {loadingId === p._id ? "Approving..." : "Approve for Sale"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
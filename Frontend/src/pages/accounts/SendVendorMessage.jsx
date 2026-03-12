// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { FaWhatsapp } from "react-icons/fa";

// export default function SendVendorMessage() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sendingId, setSendingId] = useState(null);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/account/ready-to-send-vendor");
//       setList(res.data);
//     } catch {
//       toast.error("Failed to load PO list");
//     }
//     setLoading(false);
//   };

//  const sendMsg = async (id) => {
//   try {
//     setSendingId(id);

//     const res = await axios.post(`/account/send-vendor-msg/${id}`);

//     window.open(res.data.url, "_blank");

//     toast.success("WhatsApp opened");

//     setList(prev => prev.filter(p => p._id !== id));
//   } catch {
//     toast.error("Failed");
//   }

//   setSendingId(null);
// };

//   return (
//     <div className="min-h-screen bg-[#f6f8fc] p-4 md:p-2">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow">
//           <FaWhatsapp className="text-white text-xl" />
//         </div>

//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">
//             Send PO to Vendor
//           </h1>
//           <p className="text-sm text-slate-500">
//             Notify vendors after PO approval
//           </p>
//         </div>
//       </div>

//       {/* LOADING */}
//       {loading && (
//         <p className="text-center text-slate-400 mt-20">
//           Loading...
//         </p>
//       )}

//       {/* EMPTY */}
//       {!loading && list.length === 0 && (
//         <p className="text-center text-slate-400 mt-20">
//           No pending vendor messages
//         </p>
//       )}

//       {/* CARDS */}
//       <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-6">
//         {list.map(p => (
//           <motion.div
//             key={p._id}
//             whileHover={{ y: -6 }}
//             className="bg-white rounded-3xl p-6 shadow-md border border-slate-100"
//           >
//             <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
//               Ready to send
//             </span>

//             <h3 className="text-lg font-semibold mt-3">
//               {p.materialName}
//             </h3>

//             <p className="text-sm text-slate-500 mt-1">
//               Vendor: <b>{p.vendor?.name}</b>
//             </p>

//             <div className="mt-3 text-sm text-slate-600 space-y-1">
//               <p>Qty: {p.quantity}</p>
//               <p>Rate: ₹{p.finalRate}</p>
//               <p>Total: ₹{p.totalAmount}</p>
//               <p>PO: {p.poNumber}</p>
//             </div>

//             <button
//               onClick={() => sendMsg(p._id)}
//               disabled={sendingId === p._id}
//               className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
//             >
//               <FaWhatsapp />
//               {sendingId === p._id ? "Sending..." : "Send WhatsApp"}
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
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";

/* ── Shared theme tokens ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function SendVendorMessage() {
  const [list,      setList]      = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [sendingId, setSendingId] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/account/ready-to-send-vendor");
      setList(res.data);
    } catch {
      toast.error("Failed to load PO list");
    }
    setLoading(false);
  };

  const sendMsg = async (id) => {
    try {
      setSendingId(id);
      const res = await axios.post(`/account/send-vendor-msg/${id}`);
      window.open(res.data.url, "_blank");
      toast.success("WhatsApp opened");
      setList(prev => prev.filter(p => p._id !== id));
    } catch {
      toast.error("Failed");
    }
    setSendingId(null);
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
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            boxShadow: "0 0 20px rgba(34,197,94,0.35)",
          }}
        >
          <FaWhatsapp className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Send PO to Vendor
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Notify vendors after PO approval
          </p>
        </div>
      </div>

      {/* ── STATES ── */}
      {loading && (
        <p className="text-center mt-20 text-sm" style={{ color: TEXT2 }}>Loading...</p>
      )}
      {!loading && list.length === 0 && (
        <p className="text-center mt-20 text-sm" style={{ color: TEXT2 }}>
          No pending vendor messages
        </p>
      )}

      {/* ── CARDS ── */}
      <div className="grid xl:grid-cols-3 gap-5">
        {list.map(p => (
          <motion.div
            key={p._id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="relative flex flex-col justify-between p-6 rounded-2xl"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderLeft: "4px solid #22c55e",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Ready badge */}
            <span
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(251,191,36,0.12)",
                border: "1px solid rgba(251,191,36,0.3)",
                color: "#fbbf24",
              }}
            >
              Ready to send
            </span>

            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-4 mt-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                  boxShadow: `0 0 16px rgba(99,102,241,0.35)`,
                }}
              >
                {p.materialName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                  {p.materialName}
                </p>
                <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>
                  Vendor: <span style={{ color: TEXT1 }}>{p.vendor?.name}</span>
                </p>
              </div>
            </div>

            {/* Details rows */}
            <div
              className="space-y-2.5 text-sm py-4 mb-4"
              style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
            >
              {[
                { label: "Qty",   value: p.quantity               },
                { label: "Rate",  value: `₹${p.finalRate}`        },
                { label: "Total", value: `₹${p.totalAmount}`      },
                { label: "PO #",  value: p.poNumber               },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span style={{ color: TEXT2 }}>{label}</span>
                  <span className="font-semibold" style={{ color: TEXT1 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => sendMsg(p._id)}
              disabled={sendingId === p._id}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{
                background: sendingId === p._id
                  ? "rgba(34,197,94,0.4)"
                  : "linear-gradient(135deg, #16a34a, #22c55e)",
                boxShadow: sendingId === p._id ? "none" : "0 4px 16px rgba(34,197,94,0.3)",
                border: "none",
                cursor: sendingId === p._id ? "not-allowed" : "pointer",
                opacity: sendingId === p._id ? 0.7 : 1,
              }}
            >
              <FaWhatsapp size={15} />
              {sendingId === p._id ? "Sending..." : "Send WhatsApp"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
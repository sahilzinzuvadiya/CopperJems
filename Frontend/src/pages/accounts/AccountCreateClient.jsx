// import { useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import {
//   FaUserPlus,
//   FaUser,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaCalendarAlt
// } from "react-icons/fa";

// export default function AccountsCreateClient() {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     creditDays: ""
//   });

//   const [loading, setLoading] = useState(false);

//   const submit = async () => {
//     if (!form.name || !form.phone) {
//       return toast.error("Name & phone required");
//     }

//     try {
//       setLoading(true);
//       await axios.post("/account/client", form);
//       toast.success("Client created");

//       setForm({
//         name: "",
//         phone: "",
//         address: "",
//         creditDays: ""
//       });
//     } catch {
//       toast.error("Error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="h-[calc(80vh-60px)] p-4 md:p-8 flex justify-center items-start">

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-8"
//       >
//         {/* HEADER */}
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
//             <FaUserPlus className="text-white text-lg" />
//           </div>

//           <div>
//             <h2 className="text-xl font-bold text-slate-800">
//               Create Client
//             </h2>
//             <p className="text-sm text-slate-500">
//               Add new customer for billing
//             </p>
//           </div>
//         </div>

//         {/* NAME */}
//         <div className="relative mb-4">
//           <FaUser className="absolute left-3 top-3 text-gray-400" />
//           <input
//             placeholder="Client Name"
//             value={form.name}
//             onChange={(e)=>setForm({...form,name:e.target.value})}
//             className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//         </div>

//         {/* PHONE */}
//         <div className="relative mb-4">
//           <FaPhone className="absolute left-3 top-3 text-gray-400" />
//           <input
//             placeholder="WhatsApp Number"
//             value={form.phone}
//             onChange={(e)=>setForm({...form,phone:e.target.value})}
//             className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//         </div>

//         {/* ADDRESS */}
//         <div className="relative mb-4">
//           <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
//           <input
//             placeholder="Address"
//             value={form.address}
//             onChange={(e)=>setForm({...form,address:e.target.value})}
//             className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//         </div>

//         {/* CREDIT DAYS */}
//         <div className="relative mb-6">
//           <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
//           <input
//             placeholder="Credit Days (30 / 45 etc)"
//             value={form.creditDays}
//             onChange={(e)=>setForm({...form,creditDays:e.target.value})}
//             className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//         </div>

//         {/* BUTTON */}
//         <button
//           onClick={submit}
//           disabled={loading}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
//         >
//           <FaUserPlus />
//           {loading ? "Creating..." : "Create Client"}
//         </button>
//       </motion.div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaUserPlus,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";

/* ── Shared theme tokens ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function AccountsCreateClient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    creditDays: ""
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.phone) return toast.error("Name & phone required");
    try {
      setLoading(true);
      await axios.post("/account/client", form);
      toast.success("Client created");
      setForm({ name: "", phone: "", address: "", creditDays: "" });
    } catch {
      toast.error("Error");
    }
    setLoading(false);
  };

  const fields = [
    { icon: <FaUser size={13} />,         placeholder: "Client Name",              key: "name",       type: "text"   },
    { icon: <FaPhone size={13} />,        placeholder: "WhatsApp Number",          key: "phone",      type: "text"   },
    { icon: <FaMapMarkerAlt size={13} />, placeholder: "Address",                  key: "address",    type: "text"   },
    { icon: <FaCalendarAlt size={13} />,  placeholder: "Credit Days (30 / 45 etc)",key: "creditDays", type: "number" },
  ];

  return (
    <div className="h-[calc(80vh-60px)] p-4 md:p-8 flex justify-center items-start">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl p-6 md:p-8 rounded-2xl"
        style={{
          background: CARD,
          border: `1px solid ${BORDER}`,
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top glow line */}
        <div style={{
          position: "absolute", marginTop: "-24px", left: "50%", transform: "translateX(-50%)",
          width: "160px", height: "1px",
          background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
        }} />

        {/* ── HEADER ── */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
              boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
            }}
          >
            <FaUserPlus className="text-white" size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: TEXT1 }}>
              Create Client
            </h2>
            <p className="text-sm mt-1" style={{ color: TEXT2 }}>
              Add new customer for billing
            </p>
          </div>
        </div>

        {/* ── FIELDS ── */}
        <div className="space-y-4 mb-6">
          {fields.map(({ icon, placeholder, key, type }) => (
            <div key={key} className="relative">
              {/* Icon */}
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: TEXT2 }}
              >
                {icon}
              </span>

              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: `1px solid ${BORDER}`,
                  color: TEXT1,
                  outline: "none",
                  borderRadius: "12px",
                  padding: "12px 16px 12px 36px",
                  width: "100%",
                  fontSize: "14px",
                }}
                onFocus={e => {
                  e.target.style.borderColor = "rgba(167,139,250,0.6)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                  e.target.style.background = "rgba(99,102,241,0.1)";
                  // tint the icon
                  e.target.previousSibling.style.color = VIOLET;
                }}
                onBlur={e => {
                  e.target.style.borderColor = BORDER;
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "rgba(99,102,241,0.06)";
                  e.target.previousSibling.style.color = TEXT2;
                }}
              />
            </div>
          ))}
        </div>

        {/* ── BUTTON ── */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={submit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <FaUserPlus size={14} />
          {loading ? "Creating..." : "Create Client"}
        </motion.button>
      </motion.div>
    </div>
  );
}
// import { useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import {
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Calendar,
//   Building2
// } from "lucide-react";

// export default function CreateVendor() {

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     creditDays: ""
//   });

//   const [loading, setLoading] = useState(false);

//   const submit = async () => {
//     if (!form.name || !form.phone)
//       return toast.error("Name & phone required");

//     try {
//       setLoading(true);

//       await axios.post("/vendor/create", form);

//       toast.success("Vendor created");

//       setForm({
//         name: "",
//         phone: "",
//         email: "",
//         address: "",
//         creditDays: ""
//       });

//     } catch {
//       toast.error("Error creating vendor");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex justify-center px-4 py-1">
//       <div className="w-full max-w-xl">

//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
//         >

//           {/* HEADER */}
//           <div className="flex items-center gap-4 mb-8">
//             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
//               <Building2 className="text-white" />
//             </div>

//             <div>
//               <h2 className="text-xl font-bold text-slate-800">
//                 Create Vendor
//               </h2>
//               <p className="text-sm text-slate-500">
//                 Add new supplier for purchase orders
//               </p>
//             </div>
//           </div>

//           {/* FORM - VERTICAL */}
//           <div className="space-y-4">

//             <Input icon={<User size={18} />}
//               placeholder="Vendor Name"
//               value={form.name}
//               onChange={(v)=>setForm({...form,name:v})}
//             />

//             <Input icon={<Phone size={18} />}
//               placeholder="Phone"
//               value={form.phone}
//               onChange={(v)=>setForm({...form,phone:v})}
//             />

//             <Input icon={<Mail size={18} />}
//               placeholder="Email"
//               value={form.email}
//               onChange={(v)=>setForm({...form,email:v})}
//             />

//             <Input icon={<MapPin size={18} />}
//               placeholder="Address"
//               value={form.address}
//               onChange={(v)=>setForm({...form,address:v})}
//             />

//             <Input icon={<Calendar size={18} />}
//               placeholder="Credit Days"
//               value={form.creditDays}
//               onChange={(v)=>setForm({...form,creditDays:v})}
//             />

//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={submit}
//             disabled={loading}
//             className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-semibold"
//           >
//             {loading ? "Creating..." : "Create Vendor"}
//           </button>

//         </motion.div>
//       </div>
//     </div>
//   );
// }

// function Input({ icon, placeholder, value, onChange }) {
//   return (
//     <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl w-full">
//       <span className="text-slate-400">{icon}</span>

//       <input
//         value={value}
//         onChange={(e)=>onChange(e.target.value)}
//         placeholder={placeholder}
//         className="bg-transparent outline-none w-full"
//       />
//     </div>
//   );
// }
import { useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { User, Phone, Mail, MapPin, Calendar, Building2 } from "lucide-react";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function CreateVendor() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", creditDays: ""
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.phone) return toast.error("Name & phone required");
    try {
      setLoading(true);
      await axios.post("/vendor/create", form);
      toast.success("Vendor created");
      setForm({ name: "", phone: "", email: "", address: "", creditDays: "" });
    } catch { toast.error("Error creating vendor"); }
    setLoading(false);
  };

  return (
    <div className="flex justify-center px-4 py-1">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-6 md:p-8"
          style={{
            background: CARD,
            border: `1px solid ${BORDER}`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top glow line */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "160px", height: "1px",
            background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
          }} />

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
              }}
            >
              <Building2 className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: TEXT1 }}>
                Create Vendor
              </h2>
              <p className="text-sm mt-0.5" style={{ color: TEXT2 }}>
                Add new supplier for purchase orders
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <DarkInput icon={<User size={18} />}     placeholder="Vendor Name"  value={form.name}       onChange={v => setForm({ ...form, name: v })}       />
            <DarkInput icon={<Phone size={18} />}    placeholder="Phone"        value={form.phone}      onChange={v => setForm({ ...form, phone: v })}      />
            <DarkInput icon={<Mail size={18} />}     placeholder="Email"        value={form.email}      onChange={v => setForm({ ...form, email: v })}      />
            <DarkInput icon={<MapPin size={18} />}   placeholder="Address"      value={form.address}    onChange={v => setForm({ ...form, address: v })}    />
            <DarkInput icon={<Calendar size={18} />} placeholder="Credit Days"  value={form.creditDays} onChange={v => setForm({ ...form, creditDays: v })} />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={submit}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl font-semibold text-sm text-white transition-all"
            style={{
              background: loading
                ? "rgba(99,102,241,0.4)"
                : `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
              boxShadow: loading ? "none" : "0 4px 16px rgba(99,102,241,0.35)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Vendor"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

function DarkInput({ icon, placeholder, value, onChange }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all"
      style={{ background: "rgba(99,102,241,0.06)", border: `1px solid ${BORDER}` }}
      onFocus={e => {
        e.currentTarget.style.borderColor = "rgba(167,139,250,0.6)";
        e.currentTarget.style.background  = "rgba(99,102,241,0.1)";
        e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(99,102,241,0.15)";
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = BORDER;
        e.currentTarget.style.background  = "rgba(99,102,241,0.06)";
        e.currentTarget.style.boxShadow   = "none";
      }}
    >
      <span style={{ color: TEXT2 }}>{icon}</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-sm"
        style={{ color: TEXT1, caretColor: VIOLET }}
      />
    </div>
  );
}
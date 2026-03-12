// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import { Building2, Phone, Calendar } from "lucide-react";

// export default function VendorList() {

//   const [vendors, setVendors] = useState([]);

//   useEffect(() => {
//     axios.get("/vendor/Vendorall")
//       .then(res => setVendors(res.data));
//   }, []);

//   return (
//     <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

//       {vendors.map(v => (
//         <motion.div
//           key={v._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-6 rounded-2xl shadow-md"
//         >

//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
//               <Building2 className="text-indigo-600" />
//             </div>
//             <div>
//               <h3 className="font-semibold">{v.name}</h3>
//               <p className="text-sm text-slate-500">{v.email}</p>
//             </div>
//           </div>

//           <div className="text-sm space-y-2">
//             <p className="flex items-center gap-2">
//               <Phone size={14}/> {v.phone}
//             </p>
//             <p className="flex items-center gap-2">
//               <Calendar size={14}/> Credit: {v.creditDays} days
//             </p>
//           </div>

//         </motion.div>
//       ))}

//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { Building2, Phone, Calendar, Mail } from "lucide-react";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios.get("/vendor/Vendorall").then(res => setVendors(res.data));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <Building2 className="text-white" size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>Vendors</h1>
          <p className="text-sm mt-0.5" style={{ color: TEXT2 }}>All registered suppliers</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {vendors.map((v, i) => (
          <motion.div
            key={v._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="p-5 rounded-2xl transition-all"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderLeft: `4px solid ${INDIGO}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.12)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"}
          >
            {/* Name + email */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(99,102,241,0.15)",
                  border: `1px solid rgba(99,102,241,0.3)`,
                }}
              >
                <Building2 size={18} style={{ color: VIOLET }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: TEXT1 }}>{v.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>{v.email || "—"}</p>
              </div>
            </div>

            {/* Details */}
            <div
              className="space-y-2.5 pt-3 text-sm"
              style={{ borderTop: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center gap-2" style={{ color: TEXT2 }}>
                <Phone size={13} style={{ color: VIOLET }} />
                <span style={{ color: TEXT1 }}>{v.phone}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: TEXT2 }}>
                <Calendar size={13} style={{ color: VIOLET }} />
                <span>Credit: <span style={{ color: TEXT1 }}>{v.creditDays} days</span></span>
              </div>
            </div>
          </motion.div>
        ))}

        {vendors.length === 0 && (
          <p className="col-span-full text-center py-20 text-sm" style={{ color: TEXT2 }}>
            No vendors found
          </p>
        )}
      </div>
    </div>
  );
}
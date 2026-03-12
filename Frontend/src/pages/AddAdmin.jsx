// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "../api/axios";
// import { UserPlus, Mail, Copy, X } from "lucide-react";
// import { toast } from "react-toastify";

// const departments = [
//   "Manufacturing",
//   "Sales",
//   "Purchase",
//   "Account"
// ];

// export default function AddAdmin() {
//   const [email, setEmail] = useState("");
//   const [department, setDepartment] = useState("");
//   const [createdAdmin, setCreatedAdmin] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const createAdmin = async () => {
//     if (!email || !department) {
//       toast.warning("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "/admin/create",
//         { email, department },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       setCreatedAdmin({
//         email: res.data.email,
//         department,
//         password: res.data.password
//       });

//       setEmail("");
//       setDepartment("");
//     } catch {
//       toast.error("Failed to create admin");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       {/* ================= FORM ================= */}
//       <div className="w-full flex justify-center  pt-4">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="
//             w-full max-w-xl
//             bg-white rounded-2xl
//             shadow-[0_18px_45px_rgba(0,0,0,0.08)]
//             px-8 py-8
//           "
//         >
//           {/* HEADER */}
//           <div className="text-center mb-9">
//             <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow">
//               <UserPlus size={26} className="text-white" />
//             </div>

//             <h2 className="text-2xl font-bold text-slate-800">
//               Create Admin
//             </h2>

//             <p className="text-sm text-slate-500 mt-1">
//               Department wise administrator creation
//             </p>
//           </div>

//           {/* EMAIL */}
//           <div className="mb-7">
//             <label className="text-sm font-medium text-slate-600">
//               Admin Email
//             </label>

//             <div className="relative mt-2">
//               <Mail
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 type="email"
//                 placeholder="admin@copperjems.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="
//                   w-full pl-10 pr-4 py-3 rounded-xl
//                   border border-slate-300
//                   focus:ring-2 focus:ring-indigo-500
//                   outline-none
//                 "
//               />
//             </div>
//           </div>

//           {/* DEPARTMENTS */}
//           <div className="mb-9">
//             <p className="text-sm font-medium text-slate-600 mb-3">
//               Select Department
//             </p>

//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-4 gap-3">
//               {departments.map((dep) => (
//                 <button
//                   key={dep}
//                   onClick={() => setDepartment(dep)}
//                   className={`
//                     py-3 rounded-xl border text-sm font-medium transition
//                     ${
//                       department === dep
//                         ? "bg-indigo-600 text-white border-indigo-600"
//                         : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
//                     }
//                   `}
//                 >
//                   {dep}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SUBMIT */}
//           <button
//             onClick={createAdmin}
//             disabled={loading}
//             className="
//               w-full py-3 rounded-xl
//               bg-indigo-600 text-white font-semibold
//               hover:bg-indigo-700 transition
//               disabled:opacity-70
//             "
//           >
//             {loading ? "Creating Admin..." : "Create Admin"}
//           </button>
//         </motion.div>
//       </div>

//       {/* ================= MODAL RESULT ================= */}
//       <AnimatePresence>
//         {createdAdmin && (
//           <>
//             {/* BLUR OVERLAY */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//             />

//             {/* MODAL */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="
//                 fixed inset-0 z-50
//                 flex items-center justify-center
//                 px-4
//               "
//             >
//               <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">

//                 {/* CLOSE */}
//                 <button
//                   onClick={() => setCreatedAdmin(null)}
//                   className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
//                 >
//                   <X size={20} />
//                 </button>

//                 <h3 className="text-lg font-bold text-slate-800 mb-4">
//                   Admin Created Successfully 🎉
//                 </h3>

//                 <div className="space-y-3 text-sm">
//                   <p>
//                     <span className="font-medium">Email:</span>{" "}
//                     {createdAdmin.email}
//                   </p>

//                   <p>
//                     <span className="font-medium">Department:</span>{" "}
//                     {createdAdmin.department}
//                   </p>

//                   <div className="flex items-center gap-3">
//                     <span className="font-medium">Password:</span>

//                     <span className="font-mono bg-slate-100 px-3 py-1.5 rounded-lg border">
//                       {createdAdmin.password}
//                     </span>

//                     <button
//                       onClick={() => {
//                         navigator.clipboard.writeText(
//                           createdAdmin.password
//                         );
//                         toast.success("Password copied");
//                       }}
//                       className="text-indigo-600 hover:text-indigo-800"
//                     >
//                       <Copy size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";
import { UserPlus, Mail, Copy, X } from "lucide-react";
import { toast } from "react-toastify";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

const departments = ["Manufacturing", "Sales", "Purchase", "Account"];

export default function AddAdmin() {
  const [email,        setEmail]        = useState("");
  const [department,   setDepartment]   = useState("");
  const [createdAdmin, setCreatedAdmin] = useState(null);
  const [loading,      setLoading]      = useState(false);

  const createAdmin = async () => {
    if (!email || !department) { toast.warning("Please fill all fields"); return; }
    try {
      setLoading(true);
      const res = await axios.post(
        "/admin/create", { email, department },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setCreatedAdmin({ email: res.data.email, department, password: res.data.password });
      setEmail(""); setDepartment("");
    } catch { toast.error("Failed to create admin"); }
    setLoading(false);
  };

  return (
    <>
      {/* ── FORM ── */}
      <div className="w-full flex justify-center pt-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl px-8 py-8 rounded-2xl"
          style={{
            background: CARD,
            border: `1px solid ${BORDER}`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08) inset",
          }}
        >
          {/* Header */}
          <div className="text-center mb-9">
            <div
              className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                boxShadow: `0 0 24px rgba(99,102,241,0.45)`,
              }}
            >
              <UserPlus size={26} className="text-white" />
            </div>

            <h2 className="text-2xl font-bold" style={{ color: TEXT1 }}>
              Create Admin
            </h2>
            <p className="text-sm mt-1" style={{ color: TEXT2 }}>
              Department wise administrator creation
            </p>
          </div>

          {/* Email */}
          <div className="mb-7">
            <label className="text-sm font-medium" style={{ color: TEXT2 }}>
              Admin Email
            </label>
            <div className="relative mt-2">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: TEXT2 }}
              />
              <input
                type="email"
                placeholder="admin@copperjems.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl outline-none text-sm"
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: `1px solid ${BORDER}`,
                  color: TEXT1,
                  caretColor: VIOLET,
                }}
                onFocus={e => {
                  e.target.style.borderColor = "rgba(167,139,250,0.6)";
                  e.target.style.boxShadow = `0 0 0 3px rgba(99,102,241,0.15)`;
                  e.target.style.background = "rgba(99,102,241,0.1)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = BORDER;
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "rgba(99,102,241,0.06)";
                }}
              />
            </div>
          </div>

          {/* Departments */}
          <div className="mb-9">
            <p className="text-sm font-medium mb-3" style={{ color: TEXT2 }}>
              Select Department
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {departments.map((dep) => {
                const isActive = department === dep;
                return (
                  <button
                    key={dep}
                    onClick={() => setDepartment(dep)}
                    className="py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, rgba(99,102,241,0.35), rgba(167,139,250,0.25))`
                        : "rgba(99,102,241,0.05)",
                      border: isActive
                        ? `1px solid rgba(99,102,241,0.5)`
                        : `1px solid ${BORDER}`,
                      color: isActive ? TEXT1 : TEXT2,
                      boxShadow: isActive ? `0 0 12px rgba(99,102,241,0.2)` : "none",
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = "rgba(99,102,241,0.12)";
                        e.currentTarget.style.color = "#c4b5fd";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = "rgba(99,102,241,0.05)";
                        e.currentTarget.style.color = TEXT2;
                      }
                    }}
                  >
                    {dep}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={createAdmin}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition"
            style={{
              background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
              boxShadow: `0 4px 20px rgba(99,102,241,0.4)`,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating Admin..." : "Create Admin"}
          </motion.button>
        </motion.div>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {createdAdmin && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{   scale: 0.9,  opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div
                className="w-full max-w-md rounded-2xl p-6 relative"
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 32px 64px rgba(0,0,0,0.7)",
                }}
              >
                {/* Top glow line */}
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: "160px", height: "1px",
                  background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
                }} />

                {/* Close */}
                <button
                  onClick={() => setCreatedAdmin(null)}
                  className="absolute right-4 top-4 transition"
                  style={{ color: TEXT2 }}
                  onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT2}
                >
                  <X size={20} />
                </button>

                <h3 className="text-lg font-bold mb-5" style={{ color: TEXT1 }}>
                  Admin Created Successfully 🎉
                </h3>

                <div className="space-y-4 text-sm">
                  <div
                    className="flex justify-between items-center py-2 px-3 rounded-xl"
                    style={{ background: "rgba(99,102,241,0.07)", border: `1px solid ${BORDER}` }}
                  >
                    <span style={{ color: TEXT2 }}>Email</span>
                    <span className="font-medium" style={{ color: TEXT1 }}>{createdAdmin.email}</span>
                  </div>

                  <div
                    className="flex justify-between items-center py-2 px-3 rounded-xl"
                    style={{ background: "rgba(99,102,241,0.07)", border: `1px solid ${BORDER}` }}
                  >
                    <span style={{ color: TEXT2 }}>Department</span>
                    <span className="font-medium" style={{ color: TEXT1 }}>{createdAdmin.department}</span>
                  </div>

                  <div
                    className="flex justify-between items-center py-2 px-3 rounded-xl"
                    style={{ background: "rgba(99,102,241,0.07)", border: `1px solid ${BORDER}` }}
                  >
                    <span style={{ color: TEXT2 }}>Password</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono px-3 py-1 rounded-lg text-xs"
                        style={{
                          background: "rgba(99,102,241,0.15)",
                          border: `1px solid rgba(99,102,241,0.3)`,
                          color: VIOLET,
                        }}
                      >
                        {createdAdmin.password}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(createdAdmin.password);
                          toast.success("Password copied");
                        }}
                        style={{ color: VIOLET }}
                        onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                        onMouseLeave={e => e.currentTarget.style.color = VIOLET}
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCreatedAdmin(null)}
                  className="w-full mt-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                    boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
                  }}
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
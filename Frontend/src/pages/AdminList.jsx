// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { Trash2, Pencil, X, Users } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";

// const DEPARTMENTS = ["All", "Manufacturing", "Sales", "Purchase", "Account"];

// export default function AdminList() {
//   const [admins, setAdmins] = useState([]);
//   const [editAdmin, setEditAdmin] = useState(null);
//   const [filter, setFilter] = useState("All");

//   const fetchAdmins = async () => {
//     const res = await axios.get("/admin/all", {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token")
//       }
//     });
//     setAdmins(res.data);
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const deleteAdmin = async (id) => {
//     if (!window.confirm("Delete this admin?")) return;

//     await axios.delete(`/admin/delete/${id}`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token")
//       }
//     });

//     toast.success("Admin deleted");
//     fetchAdmins();
//   };

//   const updateAdmin = async () => {
//     await axios.put(
//       `/admin/update/${editAdmin._id}`,
//       {
//         email: editAdmin.email,
//         department: editAdmin.department
//       },
//       {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token")
//         }
//       }
//     );

//     toast.success("Admin updated");
//     setEditAdmin(null);
//     fetchAdmins();
//   };

//   /* 🔥 FILTER LOGIC */
//   const filteredAdmins =
//     filter === "All"
//       ? admins
//       : admins.filter((a) => a.department === filter);

//   return (
//     <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
//       {/* HEADER */}
//       <div className="p-2 mb-6 flex items-center gap-3">
//         <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
//           {/* icon */}
//           <Users className="text-white" size={20} />
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold text-slate-800">
//             Admin Management
//           </h2>
//           <p className="text-sm text-slate-500 mt-1">
//             Manage all department administrators
//           </p>
//         </div>
//       </div>


//       {/* 🔘 FILTER BUTTONS */}
//       <div className="flex flex-wrap justify-center gap-3 mb-8">
//         {DEPARTMENTS.map((dept) => (
//           <button
//             key={dept}
//             onClick={() => setFilter(dept)}
//             className={`
//               px-6 py-2 rounded-xl text-sm font-medium transition
//               ${filter === dept
//                 ? "bg-indigo-600 text-white shadow"
//                 : "bg-white text-slate-600 hover:bg-indigo-50 shadow-lg"
//               }
//             `}
//           >
//             {dept}
//           </button>
//         ))}
//       </div>

//       {/* ADMIN CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredAdmins.map((a) => (
//           <motion.div
//             key={a._id}
//             whileHover={{ y: -4 }}
//             transition={{ duration: 0.25 }}
//             className="
//   relative
//   bg-white rounded-2xl
//   shadow-[0_18px_45px_rgba(0,0,0,0.08)]
//   p-6
//   min-h-[160px]
//   flex flex-col justify-between
// "
//           >
//             {/* DEPARTMENT BADGE */}
//             <span
//               className="
//                 absolute top-4 right-4
//                 px-4 py-1.5 rounded-full
//                 bg-indigo-600/10
//                 text-indigo-700
//                 text-xs font-semibold
//               "
//             >
//               {a.department}
//             </span>

//             {/* ADMIN INFO */}
//             <div className="flex items-center gap-4 mb-7">
//               <div
//                 className="
//                   w-12 h-12 rounded-xl
//                   bg-indigo-600 text-white
//                   flex items-center justify-center
//                   font-bold text-lg
//                   shadow mt-4
//                 "
//               >
//                 {a.email.charAt(0).toUpperCase()}
//               </div>

//               <div className="mt-4">
//                 <p className="font-semibold text-slate-800">
//                   {a.email}
//                 </p>
//                 <p className="text-xs text-slate-400">
//                   Administrator
//                 </p>
//               </div>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setEditAdmin(a)}
//                 className="
//                   flex items-center gap-2
//                   px-4 py-2 rounded-xl
//                   bg-indigo-50 hover:bg-indigo-100
//                   text-indigo-600
//                   shadow
//                   text-sm font-medium
//                 "
//               >
//                 <Pencil size={16} />
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteAdmin(a._id)}
//                 className="
//                   flex items-center gap-2
//                   px-4 py-2 rounded-xl
//                   bg-red-50 hover:bg-red-100
//                   text-red-600
//                   shadow
//                   text-sm font-medium
//                 "
//               >
//                 <Trash2 size={16} />
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {filteredAdmins.length === 0 && (
//         <div className="text-center text-slate-400 py-16">
//           No admins found
//         </div>
//       )}

//       {/* ================= EDIT MODAL ================= */}
//       <AnimatePresence>
//         {editAdmin && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />

//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center px-4"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               <div className="w-full max-w-md bg-white rounded-2xl p-6 relative shadow-2xl">
//                 <button
//                   onClick={() => setEditAdmin(null)}
//                   className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
//                 >
//                   <X size={20} />
//                 </button>

//                 <h3 className="text-lg font-bold mb-4">Edit Admin</h3>

//                 <div className="space-y-4">
//                   <input
//                     value={editAdmin.email}
//                     onChange={(e) =>
//                       setEditAdmin({
//                         ...editAdmin,
//                         email: e.target.value
//                       })
//                     }
//                     className="w-full px-4 py-3 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
//                   />

//                   <select
//                     value={editAdmin.department}
//                     onChange={(e) =>
//                       setEditAdmin({
//                         ...editAdmin,
//                         department: e.target.value
//                       })
//                     }
//                     className="w-full px-4 py-3 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
//                   >
//                     {DEPARTMENTS.filter(d => d !== "All").map(d => (
//                       <option key={d}>{d}</option>
//                     ))}
//                   </select>

//                   <div className="flex justify-end gap-3 pt-2">
//                     <button
//                       onClick={() => setEditAdmin(null)}
//                       className="px-5 py-2 rounded-xl bg-slate-100"
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       onClick={updateAdmin}
//                       className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
//                     >
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Trash2, Pencil, X, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

const DEPARTMENTS = ["All", "Manufacturing", "Sales", "Purchase", "Account"];

export default function AdminList() {
  const [admins,    setAdmins]    = useState([]);
  const [editAdmin, setEditAdmin] = useState(null);
  const [filter,    setFilter]    = useState("All");

  const fetchAdmins = async () => {
    const res = await axios.get("/admin/all", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setAdmins(res.data);
  };

  useEffect(() => { fetchAdmins(); }, []);

  const deleteAdmin = async (id) => {
    if (!window.confirm("Delete this admin?")) return;
    await axios.delete(`/admin/delete/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    toast.success("Admin deleted");
    fetchAdmins();
  };

  const updateAdmin = async () => {
    await axios.put(
      `/admin/update/${editAdmin._id}`,
      { email: editAdmin.email, department: editAdmin.department },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    toast.success("Admin updated");
    setEditAdmin(null);
    fetchAdmins();
  };

  const filteredAdmins = filter === "All"
    ? admins
    : admins.filter((a) => a.department === filter);

  const inputStyle = {
    background: "rgba(99,102,241,0.06)",
    border: `1px solid ${BORDER}`,
    color: TEXT1,
    outline: "none",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>

      {/* ── HEADER ── */}
      <div className="p-2 mb-6 flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <Users className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Admin Management
          </h2>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Manage all department administrators
          </p>
        </div>
      </div>

      {/* ── FILTER BUTTONS ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {DEPARTMENTS.map((dept) => {
          const isActive = filter === dept;
          return (
            <button
              key={dept}
              onClick={() => setFilter(dept)}
              className="px-6 py-2 rounded-xl text-sm font-medium transition-all"
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
              {dept}
            </button>
          );
        })}
      </div>

      {/* ── ADMIN CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredAdmins.map((a) => (
          <motion.div
            key={a._id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="relative flex flex-col justify-between p-6 rounded-2xl"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              minHeight: "160px",
            }}
          >
            {/* Department badge */}
            <span
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(99,102,241,0.15)",
                border: `1px solid rgba(99,102,241,0.3)`,
                color: VIOLET,
              }}
            >
              {a.department}
            </span>

            {/* Admin info */}
            <div className="flex items-center gap-4 mb-6 mt-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                  boxShadow: `0 0 16px rgba(99,102,241,0.35)`,
                }}
              >
                {a.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                  {a.email}
                </p>
                <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>
                  Administrator
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditAdmin(a)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  border: `1px solid rgba(99,102,241,0.25)`,
                  color: VIOLET,
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}
              >
                <Pencil size={15} /> Edit
              </button>

              <button
                onClick={() => deleteAdmin(a._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: `1px solid rgba(239,68,68,0.25)`,
                  color: "#f87171",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAdmins.length === 0 && (
        <div className="text-center py-16 text-sm" style={{ color: TEXT2 }}>
          No admins found
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      <AnimatePresence>
        {editAdmin && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{   scale: 0.9,  opacity: 0 }}
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
                  onClick={() => setEditAdmin(null)}
                  className="absolute right-4 top-4 transition"
                  style={{ color: TEXT2 }}
                  onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT2}
                >
                  <X size={20} />
                </button>

                <h3 className="text-lg font-bold mb-5" style={{ color: TEXT1 }}>
                  Edit Admin
                </h3>

                <div className="space-y-4">
                  <input
                    value={editAdmin.email}
                    onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = "rgba(167,139,250,0.6)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                      e.target.style.background = "rgba(99,102,241,0.1)";
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = BORDER;
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(99,102,241,0.06)";
                    }}
                  />

                  <select
                    value={editAdmin.department}
                    onChange={(e) => setEditAdmin({ ...editAdmin, department: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={e => {
                      e.target.style.borderColor = "rgba(167,139,250,0.6)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = BORDER;
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {DEPARTMENTS.filter(d => d !== "All").map(d => (
                      <option key={d} style={{ background: "#16143a", color: TEXT1 }}>{d}</option>
                    ))}
                  </select>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditAdmin(null)}
                      className="px-5 py-2 rounded-xl text-sm font-medium transition"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${BORDER}`,
                        color: TEXT2,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={updateAdmin}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                        boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
                      }}
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
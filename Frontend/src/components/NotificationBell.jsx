// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { Bell, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function NotificationBell() {
//   const [open, setOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const fetchNotifications = async () => {
//     const res = await axios.get("/notifications", {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token")
//       }
//     });
//     setNotifications(res.data);
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   return (
//     <div className="relative">
//       {/* 🔔 BELL */}
//       <motion.button
//         onClick={() => setOpen(!open)}
//         whileTap={{ scale: 0.9 }}
//         className="relative p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
//       >
//         <Bell size={18} />

//         {notifications.length > 0 && (
//           <>
//             <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-40 blur-xl animate-pulse" />
//             <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center text-white font-bold shadow">
//               {notifications.length}
//             </span>
//           </>
//         )}
//       </motion.button>

//       {/* PANEL */}
//     <AnimatePresence>
//   {open && (
//     <motion.div
//       initial={{ opacity: 0, y: 15, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: 10 }}
//       className="
//         fixed
//         top-16
//         left-2 right-2
//         mx-auto
//         w-auto
//         max-w-[95vw]

//         md:absolute
//         md:top-14
//         md:right-[-50px]
//         md:left-auto
//         md:mx-0
//         md:w-[380px]

//         lg:right-0
//         lg:top-auto

//         bg-white/80 backdrop-blur-2xl
//         border border-white/30
//         shadow-2xl rounded-3xl
//         overflow-hidden z-[999]
//       "
//     >


//             {/* HEADER */}
//             <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
//               <div>
//                 <h3 className="font-semibold">Notifications</h3>
//                 <p className="text-xs opacity-80">Live updates</p>
//               </div>

//               <button onClick={() => setOpen(false)}>
//                 <X size={18} />
//               </button>
//             </div>

//             {/* LIST */}
//             <div className="max-h-[420px] overflow-y-auto">
//               {notifications.length === 0 && (
//                 <div className="p-10 text-center text-slate-400">
//                   You're all caught up 🚀
//                 </div>
//               )}

//               {notifications.map((n, i) => (
//                 <motion.div
//                   key={n._id}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   className="group relative px-5 py-4 border-b hover:bg-indigo-50/60"
//                 >
//                   <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-indigo-500 to-purple-500 opacity-70" />

//                   <p className="font-medium text-slate-800 group-hover:text-indigo-700">
//                     {n.title}
//                   </p>

//                   <p className="text-xs text-slate-500 mt-1">
//                     {n.message}
//                   </p>

//                   {n.createdAt && (
//                     <p className="text-[10px] text-slate-400 mt-2">
//                       {new Date(n.createdAt).toLocaleTimeString()}
//                     </p>
//                   )}
//                 </motion.div>
//               ))}
//             </div>

//             {/* FOOTER */}
//             <div className="text-center py-3 text-xs text-slate-400 bg-white/60">
//               Live notifications
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CARD   = "rgba(22,20,48,0.98)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function NotificationBell() {
  const [open,          setOpen]          = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await axios.get("/notifications", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setNotifications(res.data);
  };

  useEffect(() => { fetchNotifications(); }, []);

  return (
    <div className="relative">

      {/* ── BELL ── */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 rounded-xl"
        style={{
          background: "rgba(99,102,241,0.15)",
          border: `1px solid rgba(99,102,241,0.3)`,
          color: VIOLET,
        }}
      >
        <Bell size={18} />

        {notifications.length > 0 && (
          <>
            <span
              className="absolute inset-0 rounded-xl animate-pulse"
              style={{ background: "rgba(99,102,241,0.2)", filter: "blur(8px)" }}
            />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold"
              style={{
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                boxShadow: "0 0 8px rgba(239,68,68,0.5)",
              }}
            >
              {notifications.length}
            </span>
          </>
        )}
      </motion.button>

      {/* ── PANEL ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 10               }}
            className="
              fixed top-16 left-2 right-2 mx-auto w-auto max-w-[95vw]
              md:absolute md:top-14 md:right-[-50px] md:left-auto md:mx-0 md:w-[380px]
              lg:right-0 lg:top-auto
              overflow-hidden z-[999] rounded-3xl
            "
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08) inset",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.2))",
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              {/* Top glow line */}
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "160px", height: "1px",
                background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
              }} />

              <div>
                <h3 className="font-semibold text-sm" style={{ color: TEXT1 }}>
                  Notifications
                </h3>
                <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>
                  Live updates
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="transition"
                style={{ color: TEXT2 }}
                onMouseEnter={e => e.currentTarget.style.color = TEXT1}
                onMouseLeave={e => e.currentTarget.style.color = TEXT2}
              >
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[420px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>

              {notifications.length === 0 && (
                <div className="p-10 text-center text-sm" style={{ color: TEXT2 }}>
                  You're all caught up 🚀
                </div>
              )}

              {notifications.map((n, i) => (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0  }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative px-5 py-4 transition-all"
                  style={{ borderBottom: `1px solid ${BORDER}` }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Left accent bar */}
                  <span
                    className="absolute left-0 top-0 h-full w-[3px]"
                    style={{
                      background: `linear-gradient(180deg, ${INDIGO}, ${VIOLET})`,
                      opacity: 0.7,
                    }}
                  />

                  <p className="font-medium text-sm" style={{ color: TEXT1 }}>
                    {n.title}
                  </p>

                  <p className="text-xs mt-1" style={{ color: TEXT2 }}>
                    {n.message}
                  </p>

                  {n.createdAt && (
                    <p className="text-[10px] mt-2" style={{ color: "rgba(99,102,241,0.5)" }}>
                      {new Date(n.createdAt).toLocaleTimeString()}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="text-center py-3 text-xs"
              style={{
                borderTop: `1px solid ${BORDER}`,
                background: "rgba(99,102,241,0.04)",
                color: TEXT2,
              }}
            >
              Live notifications
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
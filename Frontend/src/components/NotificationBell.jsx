import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await axios.get("/notifications", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      {/* 🔔 BELL */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
      >
        <Bell size={18} />

        {notifications.length > 0 && (
          <>
            <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-40 blur-xl animate-pulse" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center text-white font-bold shadow">
              {notifications.length}
            </span>
          </>
        )}
      </motion.button>

      {/* PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-4 w-[380px] max-w-[95vw] bg-white/80 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl overflow-hidden z-50"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <div>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-xs opacity-80">Live updates</p>
              </div>

              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* LIST */}
            <div className="max-h-[420px] overflow-y-auto">
              {notifications.length === 0 && (
                <div className="p-10 text-center text-slate-400">
                  You're all caught up 🚀
                </div>
              )}

              {notifications.map((n, i) => (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative px-5 py-4 border-b hover:bg-indigo-50/60"
                >
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-indigo-500 to-purple-500 opacity-70" />

                  <p className="font-medium text-slate-800 group-hover:text-indigo-700">
                    {n.title}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {n.message}
                  </p>

                  {n.createdAt && (
                    <p className="text-[10px] text-slate-400 mt-2">
                      {new Date(n.createdAt).toLocaleTimeString()}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="text-center py-3 text-xs text-slate-400 bg-white/60">
              Live notifications
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

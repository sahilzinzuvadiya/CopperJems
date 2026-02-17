import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Trash2, Pencil, X, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const DEPARTMENTS = ["All", "Manufacturing", "Sales", "Purchase", "Account"];

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState(null);
  const [filter, setFilter] = useState("All");

  const fetchAdmins = async () => {
    const res = await axios.get("/admin/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    setAdmins(res.data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    if (!window.confirm("Delete this admin?")) return;

    await axios.delete(`/admin/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    toast.success("Admin deleted");
    fetchAdmins();
  };

  const updateAdmin = async () => {
    await axios.put(
      `/admin/update/${editAdmin._id}`,
      {
        email: editAdmin.email,
        department: editAdmin.department
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    toast.success("Admin updated");
    setEditAdmin(null);
    fetchAdmins();
  };

  /* 🔥 FILTER LOGIC */
  const filteredAdmins =
    filter === "All"
      ? admins
      : admins.filter((a) => a.department === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      {/* HEADER */}
      <div className="p-2 mb-6 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
          {/* icon */}
          <Users className="text-white" size={20} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Admin Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage all department administrators
          </p>
        </div>
      </div>


      {/* 🔘 FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            onClick={() => setFilter(dept)}
            className={`
              px-6 py-2 rounded-xl text-sm font-medium transition
              ${filter === dept
                ? "bg-indigo-600 text-white shadow"
                : "bg-white text-slate-600 hover:bg-indigo-50 shadow-lg"
              }
            `}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* ADMIN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAdmins.map((a) => (
          <motion.div
            key={a._id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="
  relative
  bg-white rounded-2xl
  shadow-[0_18px_45px_rgba(0,0,0,0.08)]
  p-6
  min-h-[160px]
  flex flex-col justify-between
"
          >
            {/* DEPARTMENT BADGE */}
            <span
              className="
                absolute top-4 right-4
                px-4 py-1.5 rounded-full
                bg-indigo-600/10
                text-indigo-700
                text-xs font-semibold
              "
            >
              {a.department}
            </span>

            {/* ADMIN INFO */}
            <div className="flex items-center gap-4 mb-7">
              <div
                className="
                  w-12 h-12 rounded-xl
                  bg-indigo-600 text-white
                  flex items-center justify-center
                  font-bold text-lg
                  shadow mt-4
                "
              >
                {a.email.charAt(0).toUpperCase()}
              </div>

              <div className="mt-4">
                <p className="font-semibold text-slate-800">
                  {a.email}
                </p>
                <p className="text-xs text-slate-400">
                  Administrator
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditAdmin(a)}
                className="
                  flex items-center gap-2
                  px-4 py-2 rounded-xl
                  bg-indigo-50 hover:bg-indigo-100
                  text-indigo-600
                  shadow
                  text-sm font-medium
                "
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => deleteAdmin(a._id)}
                className="
                  flex items-center gap-2
                  px-4 py-2 rounded-xl
                  bg-red-50 hover:bg-red-100
                  text-red-600
                  shadow
                  text-sm font-medium
                "
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAdmins.length === 0 && (
        <div className="text-center text-slate-400 py-16">
          No admins found
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      <AnimatePresence>
        {editAdmin && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="w-full max-w-md bg-white rounded-2xl p-6 relative shadow-2xl">
                <button
                  onClick={() => setEditAdmin(null)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
                >
                  <X size={20} />
                </button>

                <h3 className="text-lg font-bold mb-4">Edit Admin</h3>

                <div className="space-y-4">
                  <input
                    value={editAdmin.email}
                    onChange={(e) =>
                      setEditAdmin({
                        ...editAdmin,
                        email: e.target.value
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <select
                    value={editAdmin.department}
                    onChange={(e) =>
                      setEditAdmin({
                        ...editAdmin,
                        department: e.target.value
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {DEPARTMENTS.filter(d => d !== "All").map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditAdmin(null)}
                      className="px-5 py-2 rounded-xl bg-slate-100"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={updateAdmin}
                      className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
                    >
                      Save Changes
                    </button>
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

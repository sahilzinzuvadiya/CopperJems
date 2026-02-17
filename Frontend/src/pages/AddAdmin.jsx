import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";
import { UserPlus, Mail, Copy, X } from "lucide-react";
import { toast } from "react-toastify";

const departments = [
  "Manufacturing",
  "Sales",
  "Purchase",
  "Account"
];

export default function AddAdmin() {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [createdAdmin, setCreatedAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const createAdmin = async () => {
    if (!email || !department) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "/admin/create",
        { email, department },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setCreatedAdmin({
        email: res.data.email,
        department,
        password: res.data.password
      });

      setEmail("");
      setDepartment("");
    } catch {
      toast.error("Failed to create admin");
    }

    setLoading(false);
  };

  return (
    <>
      {/* ================= FORM ================= */}
      <div className="w-full flex justify-center px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            w-full max-w-xl
            bg-white rounded-2xl
            shadow-[0_18px_45px_rgba(0,0,0,0.08)]
            px-8 py-8
          "
        >
          {/* HEADER */}
          <div className="text-center mb-9">
            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow">
              <UserPlus size={26} className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Create Admin
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Department wise administrator creation
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-7">
            <label className="text-sm font-medium text-slate-600">
              Admin Email
            </label>

            <div className="relative mt-2">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                placeholder="admin@copperjems.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  border border-slate-300
                  focus:ring-2 focus:ring-indigo-500
                  outline-none
                "
              />
            </div>
          </div>

          {/* DEPARTMENTS */}
          <div className="mb-9">
            <p className="text-sm font-medium text-slate-600 mb-3">
              Select Department
            </p>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-4 gap-3">
              {departments.map((dep) => (
                <button
                  key={dep}
                  onClick={() => setDepartment(dep)}
                  className={`
                    py-3 rounded-xl border text-sm font-medium transition
                    ${
                      department === dep
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }
                  `}
                >
                  {dep}
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={createAdmin}
            disabled={loading}
            className="
              w-full py-3 rounded-xl
              bg-indigo-600 text-white font-semibold
              hover:bg-indigo-700 transition
              disabled:opacity-70
            "
          >
            {loading ? "Creating Admin..." : "Create Admin"}
          </button>
        </motion.div>
      </div>

      {/* ================= MODAL RESULT ================= */}
      <AnimatePresence>
        {createdAdmin && (
          <>
            {/* BLUR OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="
                fixed inset-0 z-50
                flex items-center justify-center
                px-4
              "
            >
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">

                {/* CLOSE */}
                <button
                  onClick={() => setCreatedAdmin(null)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
                >
                  <X size={20} />
                </button>

                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  Admin Created Successfully 🎉
                </h3>

                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {createdAdmin.email}
                  </p>

                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {createdAdmin.department}
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="font-medium">Password:</span>

                    <span className="font-mono bg-slate-100 px-3 py-1.5 rounded-lg border">
                      {createdAdmin.password}
                    </span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          createdAdmin.password
                        );
                        toast.success("Password copied");
                      }}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaIndustry,
  FaPlay,
  FaCheckCircle,
  FaTimes,
  FaBoxOpen
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function EmployeeProduction() {
  const [list, setList] = useState([]);
  const [active, setActive] = useState(null);
  const [qty, setQty] = useState("");
  const [loading, setLoading] = useState(false);

  const load = () => {
    axios.get("/production").then(res => setList(res.data));
  };

  useEffect(load, []);

  const start = async (id) => {
    try {
      await axios.put("/production/start/" + id);
      toast.success("Production started");
      load();
    } catch {
      toast.error("Error starting");
    }
  };

  const complete = async () => {
    if (!qty) return toast.error("Enter output qty");

    try {
      setLoading(true);

      await axios.put("/production/complete/" + active._id, {
        outputQty: Number(qty)
      });

      toast.success("Production completed");

      setActive(null);
      setQty("");
      load();

    } catch {
      toast.error("Error completing");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-1 md:p-2">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
          <FaIndustry className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Production Tasks
          </h1>
          <p className="text-sm text-slate-500">
            Start and complete manufacturing jobs
          </p>
        </div>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
        {list.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-600"
          >
            <h3 className="text-lg font-semibold text-slate-800">
              {p.wireType} Wire
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Raw Used: <b>{p.rawQtyUsed}</b>
            </p>

            <p className="text-sm mt-2">
              Status:
              <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold
                ${p.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                  p.status === "IN_PROGRESS" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-700"}
              `}>
                {p.status}
              </span>
            </p>

            {/* ACTIONS */}
            <div className="mt-5 flex gap-3">
              {p.status === "PENDING" && (
                <button
                  onClick={() => start(p._id)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700"
                >
                  <FaPlay />
                  Start
                </button>
              )}

              {p.status === "IN_PROGRESS" && (
                <button
                  onClick={() => setActive(p)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
                >
                  <FaCheckCircle />
                  Complete
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl"
            >
              {/* CLOSE */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>

              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaBoxOpen className="text-indigo-600" />
                Complete Production
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Wire Type: <b>{active.wireType}</b>
              </p>

              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="Enter output qty"
                className="w-full border rounded-lg px-4 py-2 mb-4"
              />

              <button
                onClick={complete}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg"
              >
                {loading ? "Saving..." : "Complete"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

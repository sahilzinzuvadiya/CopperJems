import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaIndustry,
  FaCheckCircle,
  FaCubes,
  FaPlusCircle,
  FaTimes
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function ManufactureCreate() {
  const [prs, setPRs] = useState([]);
  const [wireType, setWireType] = useState("9mm");
  const [qty, setQty] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/production/production-ready").then(res => setPRs(res.data));
  }, []);

  const create = async () => {
    if (!qty) return toast.error("Enter quantity");

    try {
      setLoading(true);

      await axios.post("/production/create", {
        prId: selected._id,
        wireType,
        rawQtyUsed: qty
      });

      toast.success("Production created");

      setQty("");
      setSelected(null);
      setQty("");

      const res = await axios.get("/production/production-ready");
      setPRs(res.data);

    } catch (err) {
      toast.error("Error creating production");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-2">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
          <FaIndustry className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl max-sm:text-xl font-bold text-slate-800">
            Manufacturing Production
          </h1>
          <p className="text-sm text-slate-500">
            Create wire production from raw material
          </p>
        </div>
      </div>

      {/* MATERIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
        {prs.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow p-5"
          >
            <h3 className="text-lg font-semibold">{p.materialName}</h3>

            <p className="text-sm mt-1">
              Available: <b>{p.remainingForProduction}</b>
            </p>

            <button
              onClick={() => setSelected(p)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <FaCheckCircle />
              Start Production
            </button>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selected && (
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
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                <FaTimes size={18} />
              </button>

              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaCubes className="text-indigo-600" />
                Create Production
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Material: <b>{selected.materialName}</b>
              </p>

              {/* TYPE */}
              <div className="mb-4">
                <label className="text-sm font-medium">Wire Type</label>
                <select
                  value={wireType}
                  onChange={(e) => setWireType(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                >
                  <option>9mm</option>
                  <option>12mm</option>
                  <option>6mm</option>
                </select>
              </div>

              {/* QTY */}
              <div className="mb-5">
                <label className="text-sm font-medium">Raw Qty</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>

              {/* ACTIONS */}
              <button
                onClick={create}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FaPlusCircle />
                {loading ? "Creating..." : "Create Production"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaUser,
  FaCubes,
  FaSearch,
  FaCalendarAlt,
  FaBuilding,
  FaRupeeSign
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function SalesHistory() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/sales/history");
      setList(res.data);
    } catch {
      toast.error("Failed to load sales history");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = list.filter(i =>
    i.wireType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-2">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
          <FaShoppingCart className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Sales History
          </h1>
          <p className="text-sm text-slate-500">
            All sold products record
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex items-center gap-3">
        <FaSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search wire type..."
          className="w-full outline-none"
        />
      </div>

      {loading && (
        <p className="text-center text-slate-500 mt-10">Loading...</p>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-slate-500 mt-10">
          No sales yet
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <motion.div
            key={s._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600 relative"
          >
            <span className="absolute top-4 right-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              Sold
            </span>

            <h3 className="text-lg font-semibold text-slate-800">
              {s.wireType} Wire
            </h3>

            {/* QTY */}
            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <FaCubes className="text-indigo-600" />
              Qty Sold: <b>{s.qty}</b>
            </p>

            {/* RATE */}
            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <FaRupeeSign className="text-green-600" />
              Rate/Ton: <b>₹{s.ratePerTon}</b>
            </p>

            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <FaRupeeSign className="text-green-700" />
              Total: <b>₹{s.totalAmount}</b>
            </p>

            {/* CLIENT */}
            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <FaBuilding className="text-blue-500" />
              Client: <b>{s.client?.name || "Unknown"}</b>
            </p>

            {/* EMPLOYEE */}
            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <FaUser className="text-gray-500" />
              Sold By: <b>{s.soldBy?.name || "Unknown"}</b>
            </p>

            {/* DATE */}
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-2">
              <FaCalendarAlt />
              {new Date(s.createdAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

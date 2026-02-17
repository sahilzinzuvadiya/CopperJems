import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaIndustry,
  FaBoxes
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function SalesAdmin() {
  const [list, setList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const load = () => {
    axios.get("/sales/pending").then(res => setList(res.data));
    // console.log("API DATA:", res.data); 
  };

  useEffect(load, []);

  const approve = async (id) => {
    try {
      setLoadingId(id);

      await axios.put("/sales/approve/" + id);

      toast.success("Stock approved for sale");

      setList(prev => prev.filter(i => i._id !== id));
    } catch {
      toast.error("Error approving");
    }

    setLoadingId(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-2">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
          <FaIndustry className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Sales Admin Panel
          </h1>
          <p className="text-sm text-slate-500">
            Approve finished goods for sale
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {list.length === 0 && (
        <div className="text-center mt-20 text-slate-500">
          No pending stock
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {list.map((p) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-600 relative"
          >

            {/* BADGE */}
            <span className="absolute top-4 right-4 text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
              Pending Approval
            </span>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-slate-800">
              {p.wireType} Wire
            </h3>

            {/* QTY */}
            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <FaBoxes className="text-indigo-600" />
              Produced Qty: <b>{p.totalQty}</b>
            </p>

            {/* BUTTON */}
            <button
              onClick={() => approve(p._id)}
              disabled={loadingId === p._id}
              className="
                mt-6 w-full flex items-center justify-center gap-2
                bg-green-600 hover:bg-green-700
                text-white py-2 rounded-lg
                transition
              "
            >
              <FaCheckCircle />
              {loadingId === p._id ? "Approving..." : "Approve for Sale"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

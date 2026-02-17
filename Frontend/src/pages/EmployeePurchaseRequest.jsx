import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Boxes,
  IndianRupee,
  CalendarDays
} from "lucide-react";

export default function MyPurchaseRequests() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get("/purchase/my"); // employee PR API
    setList(res.data);
  };

  return (
    <div className="p-2 md:p-2 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <ShoppingCart className="text-white" size={26} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Purchase Requests
          </h1>
          <p className="text-slate-500 text-sm">
            Track all your material requests
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {list.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center text-slate-500">
          No requests yet
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">

        {list.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-500 relative"
          >

            {/* STATUS BADGE */}
            <span className="absolute top-4 right-4 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
              {p.status.replaceAll("_", " ")}
            </span>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-slate-800">
              {p.materialName}
            </h3>

            {/* QTY */}
            <p className="text-sm mt-3 flex items-center gap-2 text-slate-600">
              <Boxes size={16} className="text-indigo-600" />
              Qty: <b>{p.quantity}</b>
            </p>

            {/* PRICE */}
            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <IndianRupee size={16} className="text-emerald-600" />
              Expected Price: <b>₹{p.expectedPrice}</b>
            </p>

            {/* TOTAL */}
            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <IndianRupee size={16} className="text-emerald-600" />
              Total: <b>₹{p.expectedPrice * p.quantity}</b>
            </p>

            {/* DATE */}
            <p className="text-xs text-slate-400 mt-4 flex items-center gap-2">
              <CalendarDays size={14} />
              {new Date(p.createdAt).toLocaleString()}
            </p>

          </motion.div>
        ))}

      </div>
    </div>
  );
}

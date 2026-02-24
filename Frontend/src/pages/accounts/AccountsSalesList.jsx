import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FileClock,
  User,
  Package,
  IndianRupee,
  ArrowRightCircle
} from "lucide-react";

export default function AccountsSalesList({ setPage, setSaleData }) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get("/sales/pending-sales").then(res => setSales(res.data));
  }, []);

  const goInvoice = (sale) => {
    setSaleData(sale);
    setPage("create-invoice");
  };

  return (
    <div className="p-4 sm:p-2 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
          <FileClock className="text-white" />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Pending Invoices
          </h2>
          <p className="text-sm text-slate-500">
            Sales waiting for invoice generation
          </p>
        </div>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {sales.map((s, i) => (
          <motion.div
            key={s._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 flex flex-col justify-between"
          >
            {/* TOP */}
            <div className="space-y-3">
              
              {/* CLIENT */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <User size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Client</p>
                  <p className="font-semibold text-slate-800">
                    {s.client.name}
                  </p>
                </div>
              </div>

              {/* WIRE */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Package size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Wire</p>
                  <p className="font-semibold text-slate-800">
                    {s.wireType}
                  </p>
                </div>
              </div>

              {/* QTY + RATE */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Qty</p>
                  <p className="font-bold text-slate-800">
                    {s.qty}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Rate</p>
                  <p className="font-bold text-slate-800 flex items-center gap-1">
                    <IndianRupee size={14} />
                    {s.ratePerTon}
                  </p>
                </div>

              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => goInvoice(s)}
              className="mt-5 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold transition"
            >
              Generate Invoice
              <ArrowRightCircle size={18} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {sales.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <FileClock size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500">No pending invoices</p>
        </motion.div>
      )}
    </div>
  );
}

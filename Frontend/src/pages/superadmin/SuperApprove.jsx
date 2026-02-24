import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Check, X, FileCheck } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function SuperApprovePO() {
  const [pos, setPOs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPOs();
  }, []);

  const loadPOs = async () => {
    try {
      const res = await axios.get("/purchase/pending-po");
      setPOs(res.data);
    } catch {
      toast.error("Failed to load approvals");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await axios.put(`/purchase/approve-po/${id}`);
      toast.success("PO approved");
      setPOs(prev => prev.filter(p => p._id !== id));
    } catch {
      toast.error("Approval failed");
    }
  };

  const reject = async (id) => {
    try {
      await axios.put(`/purchase/reject-po/${id}`);
      toast.error("PO rejected");
      setPOs(prev => prev.filter(p => p._id !== id));
    } catch {
      toast.error("Rejection failed");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-slate-400 py-20">
        Loading purchase orders...
      </p>
    );
  }

  return (
    <div className="w-full">

      {/* 🔷 PAGE HEADING */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
          <FileCheck className="text-white" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Purchase Order Approvals
          </h2>
          <p className="text-sm text-slate-500">
            SuperAdmin approval required for created POs
          </p>
        </div>
      </div>

      {/* 🔷 LIST */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pos.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ y: -4 }}
            className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            {/* STATUS */}
            <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full
                             bg-yellow-100 text-yellow-700">
              PO Waiting Approval
            </span>

            {/* VENDOR */}
            <p className="text-xs text-slate-400">Vendor</p>
            <p className="font-semibold text-slate-800">
              {p.vendor?.name}
            </p>

            {/* DETAILS */}
            <div className="mt-4 space-y-1 text-sm">
              <p><b>Material:</b> {p.materialName}</p>
              <p><b>Qty:</b> {p.quantity}</p>
              <p><b>Rate:</b> ₹{p.finalRate}</p>
              <p><b>Total:</b> ₹{p.totalAmount}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => approve(p._id)}
                className="flex-1 flex items-center justify-center gap-2
                           border border-green-500 text-green-600
                           rounded-xl py-2 hover:bg-green-50"
              >
                <Check size={16} />
                Approve
              </button>

              <button
                onClick={() => reject(p._id)}
                className="flex-1 flex items-center justify-center gap-2
                           border border-red-500 text-red-600
                           rounded-xl py-2 hover:bg-red-50"
              >
                <X size={16} />
                Reject
              </button>
            </div>
          </motion.div>
        ))}

        {pos.length === 0 && (
          <p className="col-span-full text-center text-slate-400 py-20">
            No pending PO approvals
          </p>
        )}
      </div>
    </div>
  );
}
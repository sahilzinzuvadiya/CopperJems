import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FilePlus,
  Package,
  Hash,
  IndianRupee,
  ClipboardList
} from "lucide-react";

export default function PoReadyList({ setSelectedPR, setPage }) {
  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    axios.get("/purchase/po-ready")
      .then(res => setPRs(res.data))
      .catch(() => toast.error("Failed to load PRs"))
      .finally(() => setLoading(false));
  }, []);

  const openPO = (pr) => {
    setSelectedPR(pr);
    setPage("createpo");
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-center py-20 text-slate-400">
        Loading purchase requests...
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow">
          <ClipboardList className="text-white" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Purchase Orders Ready
          </h2>
          <p className="text-sm text-slate-500">
            Approved requests ready for PO creation
          </p>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {prs.map(p => (
          <motion.div
            key={p._id}
            whileHover={{ y: -6 }}
            className="
              bg-white rounded-2xl p-6 shadow-md
              border border-slate-200
              hover:shadow-xl hover:border-indigo-400
              transition
              flex flex-col justify-between
            "
          >

            {/* MATERIAL */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                  <Package size={18} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {p.materialName}
                  </p>
                  <p className="text-xs text-slate-400">
                    Purchase Request
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-sm">

                <div className="flex items-center gap-2 text-slate-600">
                  <Hash size={14} />
                  Qty: <b>{p.quantity}</b>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <IndianRupee size={14} />
                  Expected: <b>₹{p.expectedPrice}</b>
                </div>

              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => openPO(p)}
              className="
                mt-6 w-full bg-indigo-600
                hover:bg-indigo-700
                text-white py-2.5 rounded-xl
                flex items-center justify-center gap-2
                font-medium transition
              "
            >
              <FilePlus size={16} />
              Create Purchase Order
            </button>

          </motion.div>
        ))}

        {/* EMPTY */}
        {prs.length === 0 && (
          <div className="col-span-full text-center py-24 text-slate-400">
            No requests ready for PO
          </div>
        )}

      </div>
    </div>
  );
}

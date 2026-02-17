import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";

export default function SuperApprove() {
  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPRs();
  }, []);

  const loadPRs = async () => {
    try {
      const res = await axios.get("/purchase/pending/superadmin");
      setPRs(res.data);
    } catch (err) {
      toast.error("Failed to load approvals");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await axios.put(`/purchase/superadmin-approve/${id}`);
      toast.success("Purchase approved");
      setPRs(prev => prev.filter(p => p._id !== id));
    } catch {
      toast.error("Approval failed");
    }
  };

  const reject = async (id) => {
    try {
      await axios.put(`/purchase/superadmin-reject/${id}`);
      toast.error("Purchase rejected");
      setPRs(prev => prev.filter(p => p._id !== id));
    } catch {
      toast.error("Rejection failed");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-slate-400">
        Loading requests...
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {prs.map((p) => (
        <div
          key={p._id}
          className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
        >
          {/* STATUS */}
          <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full
                           bg-yellow-100 text-yellow-700">
            Admin Approved
          </span>

          {/* EMPLOYEE */}
          <p className="text-xs text-slate-400">Requested by</p>
          <p className="font-semibold text-slate-800">
            {p.createdBy?.name || "Employee"}
          </p>
          <p className="text-xs text-slate-500">
            {p.createdBy?.email}
          </p>

          {/* DETAILS */}
          <div className="mt-4 space-y-1 text-sm">
            <p><b>Material:</b> {p.materialName}</p>
            <p><b>Quantity:</b> {p.quantity}</p>
            <p><b>Expected Price:</b> ₹{p.expectedPrice}</p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => approve(p._id)}
              className="flex-1 flex items-center justify-center gap-2
                         border border-green-500 text-green-600
                         rounded-xl py-2 hover:bg-green-50
                         cursor-pointer transition"
            >
              <Check size={16} />
              Approve
            </button>

            <button
              onClick={() => reject(p._id)}
              className="flex-1 flex items-center justify-center gap-2
                         border border-red-500 text-red-600
                         rounded-xl py-2 hover:bg-red-50
                         cursor-pointer transition"
            >
              <X size={16} />
              Reject
            </button>
          </div>
        </div>
      ))}

      {prs.length === 0 && (
        <p className="col-span-full text-center text-slate-400">
          No pending approvals
        </p>
      )}
    </div>
  );
}

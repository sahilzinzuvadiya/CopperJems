import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { Check, X, ClipboardCheck } from "lucide-react";

export default function AdminApprovals() {
  const [prs, setPRs] = useState([]);
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchPRs();
  }, []);

  const fetchPRs = async () => {
    try {
      const res = await axios.get("/purchase/pending/admin");
      setPRs(res.data);
    } catch {
      toast.error("Failed to load requests");
    }
  };

  const approve = async (id) => {
    try {
      await axios.put(`/purchase/admin-approve/${id}`);
      toast.success("Request approved");
      setPRs((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Approval failed");
    }
  };

  const reject = async () => {
    if (!reason.trim()) {
      toast.warning("Enter rejection reason");
      return;
    }

    try {
      await axios.put(`/purchase/admin-reject/${rejectId}`, { reason });
      toast.error("Request rejected");
      setPRs((prev) => prev.filter((p) => p._id !== rejectId));
      setRejectId(null);
      setReason("");
    } catch {
      toast.error("Rejection failed");
    }
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
          <ClipboardCheck className="text-white" size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Purchase Approvals
          </h1>
          <p className="text-sm text-slate-500">
            Review and approve employee purchase requests
          </p>
        </div>
      </div>

      {/* ================= REQUEST LIST ================= */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {prs.map((p) => (
          <div
            key={p._id}
            className="
              relative bg-white rounded-xl p-5
              border border-slate-200
              hover:shadow-lg hover:border-indigo-500
              transition
            "
          >
            {/* STATUS BADGE */}
            <span className="absolute top-4 right-4 text-xs font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              Pending
            </span>

            {/* EMPLOYEE */}
            <p className="text-sm text-slate-500 mb-1">
              Requested by
            </p>
            <p className="font-semibold text-slate-800">
              {p.createdBy?.name || "Employee"}
            </p>

            {/* MATERIAL */}
            <div className="mt-4">
              <p className="text-xs text-slate-400">Material</p>
              <p className="font-medium text-slate-700">
                {p.materialName}
              </p>
            </div>

            {/* DETAILS */}
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Quantity</p>
                <p className="font-medium">{p.quantity}</p>
              </div>
              <div>
                <p className="text-slate-400">Expected Price</p>
                <p className="font-medium">₹{p.expectedPrice}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => approve(p._id)}
                className="flex-1 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition text-sm font-medium"
              >
                <Check size={16} className="inline mr-1" />
                Approve
              </button>

              <button
                onClick={() => setRejectId(p._id)}
                className="flex-1 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition text-sm font-medium"
              >
                <X size={16} className="inline mr-1" />
                Reject
              </button>
            </div>
          </div>
        ))}

        {prs.length === 0 && (
          <p className="col-span-full text-center text-slate-400 py-20">
            No pending purchase requests
          </p>
        )}
      </div>

      {/* ================= REJECT MODAL ================= */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setRejectId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-2">
              Reject Purchase Request
            </h3>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter rejection reason"
              className="w-full h-28 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setRejectId(null)}
                className="px-4 py-2 rounded-lg bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={reject}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
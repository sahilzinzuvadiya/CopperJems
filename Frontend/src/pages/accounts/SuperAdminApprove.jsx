import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaWallet } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SuperAdminApprove() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axios.get("/account/request-funds");
      setFunds(res.data);
    } catch {
      toast.error("Failed to load requests");
    }
    setLoading(false);
  };

  const approve = async (id) => {
    try {
      await axios.post(`/account/approve-funds/${id}`);
      toast.success("Approved");
      setFunds(prev => prev.filter(f => f._id !== id));
    } catch {
      toast.error("Failed");
    }
  };

  const reject = async (id) => {
    try {
      await axios.post(`/account/request-funds/${id}`);
      toast.info("Rejected");
      setFunds(prev => prev.filter(f => f._id !== id));
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-2">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <FaWallet className="text-indigo-600 text-3xl" />
        <h1 className="text-2xl font-bold">
          Fund Requests Approval
        </h1>
      </div>

      {loading && (
        <p className="text-center mt-20 text-gray-500">Loading...</p>
      )}

      {!loading && funds.length === 0 && (
        <p className="text-center mt-20 text-gray-500">
          No pending requests
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">

        {funds.map((f) => {

          const pr = f.purchaseRequest || {};
          const total = (pr.quantity || 0) * (pr.expectedPrice || 0);

          return (
            <motion.div
              key={f._id}
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border-l-4 border-indigo-600 overflow-hidden"
            >

              <div className="p-6">

                <h3 className="text-2xl font-bold text-indigo-600">
                  ₹ {f.amount.toLocaleString()}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Requested on {new Date(f.createdAt).toLocaleDateString()}
                </p>

                <div className="border-t my-4"></div>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-500">Material</span>
                    <span className="font-medium">
                      {pr.materialName || "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Quantity</span>
                    <span className="font-medium">
                      {pr.quantity || 0}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Rate</span>
                    <span className="font-medium">
                      ₹ {pr.expectedPrice?.toLocaleString?.() || 0}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Total</span>
                    <span className="font-semibold text-indigo-600">
                      ₹ {total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Requested By</span>
                  <span className="font-medium">
  {f.requestedBy?.name || f.requestedBy?.email || "-"}
</span>

                  </div>

                </div>
              </div>

              {/* BUTTONS */}
              <div className="p-4 bg-gray-50 flex gap-3">
                <button
                  onClick={() => approve(f._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  <FaCheckCircle />
                  Approve
                </button>

                <button
                  onClick={() => reject(f._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  <FaTimesCircle />
                  Reject
                </button>
              </div>

            </motion.div>
          );
        })}

      </div>
    </div>
  );
}

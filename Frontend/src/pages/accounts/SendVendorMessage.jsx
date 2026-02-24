import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";

export default function SendVendorMessage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/account/ready-to-send-vendor");
      setList(res.data);
    } catch {
      toast.error("Failed to load PO list");
    }
    setLoading(false);
  };

 const sendMsg = async (id) => {
  try {
    setSendingId(id);

    const res = await axios.post(`/account/send-vendor-msg/${id}`);

    window.open(res.data.url, "_blank");

    toast.success("WhatsApp opened");

    setList(prev => prev.filter(p => p._id !== id));
  } catch {
    toast.error("Failed");
  }

  setSendingId(null);
};

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-4 md:p-2">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow">
          <FaWhatsapp className="text-white text-xl" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Send PO to Vendor
          </h1>
          <p className="text-sm text-slate-500">
            Notify vendors after PO approval
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-slate-400 mt-20">
          Loading...
        </p>
      )}

      {/* EMPTY */}
      {!loading && list.length === 0 && (
        <p className="text-center text-slate-400 mt-20">
          No pending vendor messages
        </p>
      )}

      {/* CARDS */}
      <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-6">
        {list.map(p => (
          <motion.div
            key={p._id}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-6 shadow-md border border-slate-100"
          >
            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              Ready to send
            </span>

            <h3 className="text-lg font-semibold mt-3">
              {p.materialName}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Vendor: <b>{p.vendor?.name}</b>
            </p>

            <div className="mt-3 text-sm text-slate-600 space-y-1">
              <p>Qty: {p.quantity}</p>
              <p>Rate: ₹{p.finalRate}</p>
              <p>Total: ₹{p.totalAmount}</p>
              <p>PO: {p.poNumber}</p>
            </div>

            <button
              onClick={() => sendMsg(p._id)}
              disabled={sendingId === p._id}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
            >
              <FaWhatsapp />
              {sendingId === p._id ? "Sending..." : "Send WhatsApp"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
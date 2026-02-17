import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaShoppingCart,
  FaUser,
  FaBoxes,
  FaTimes,
  FaCheckCircle,
  FaRupeeSign
} from "react-icons/fa";

export default function SalesEmployee() {
  const [stock, setStock] = useState([]);
  const [clients, setClients] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [qty, setQty] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ratePerTon, setRatePerTon] = useState("");

  const load = async () => {
    try {
      const s = await axios.get("/sales/stock");
      setStock(s.data);

      const c = await axios.get("/account/all");
      setClients(c.data);
    } catch {
      toast.error("Load error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const sell = async () => {
    if (!selectedClient || !qty || !ratePerTon) {
      return toast.error("Fill all fields");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "/sales/sell",
        {
          id: selectedItem._id,
          qty: Number(qty),
          clientId: selectedClient,
          ratePerTon: Number(ratePerTon)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Product sold");

      setQty("");
      setSelectedClient("");
      setSelectedItem(null);
      setRatePerTon("");

      load();
    } catch (err) {
      console.log("SELL ERROR:", err.response?.data || err.message);
      toast.error("Sale failed");
    }

    setLoading(false);
  };

  const total = Number(qty || 0) * Number(ratePerTon || 0);

  return (
    <div className="min-h-screen p-4 md:p-2">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
          <FaShoppingCart className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sales Panel</h1>
          <p className="text-sm text-slate-500">
            Sell finished products to clients
          </p>
        </div>
      </div>

      {/* STOCK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
        {stock.map((p) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-600"
          >
            <h3 className="text-lg font-semibold text-slate-800">
              {p.wireType} Wire
            </h3>

            <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
              <FaBoxes className="text-indigo-600" />
              Available: <b>{p.availableQty}</b>
            </p>

            <button
              onClick={() => setSelectedItem(p)}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <FaShoppingCart />
              Sell Product
            </button>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setSelectedItem(null)}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black"
                >
                  <FaTimes />
                </button>

                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Sell {selectedItem.wireType} Wire
                </h2>

                {/* CLIENT */}
                <div className="mb-4">
                  <label className="text-sm font-medium">Select Client</label>
                  <div className="relative mt-1">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <select
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
                      className="w-full border rounded-lg pl-10 pr-3 py-2"
                    >
                      <option value="">Select client</option>
                      {clients.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* QTY */}
                <div className="mb-4">
                  <label className="text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 mt-1"
                  />
                </div>

                {/* RATE */}
                <div className="mb-4">
                  <label className="text-sm font-medium">Rate per Ton</label>
                  <div className="relative mt-1">
                    <FaRupeeSign className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      value={ratePerTon}
                      onChange={(e) => setRatePerTon(e.target.value)}
                      className="w-full border rounded-lg pl-10 pr-3 py-2"
                    />
                  </div>
                </div>

                {/* TOTAL */}
                <div className="mb-6 text-right text-lg font-semibold text-green-700">
                  Total: ₹{total.toLocaleString()}
                </div>

                {/* BUTTON */}
                <button
                  onClick={sell}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  {loading ? "Processing..." : "Confirm Sale"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

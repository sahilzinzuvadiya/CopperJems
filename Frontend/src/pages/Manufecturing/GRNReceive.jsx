import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function GRNReceive() {
  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePR, setActivePR] = useState(null);
  const [receivedQty, setReceivedQty] = useState("");
  const [damagedQty, setDamagedQty] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchPRs();
  }, []);

  const fetchPRs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/grn/grn-pending");
      setPRs(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load GRN list");
    }
    setLoading(false);
  };

  /* ================= SUBMIT GRN ================= */
  const submitGRN = async () => {
    const qty = Number(receivedQty);
    const dmg = Number(damagedQty || 0);

    if (!qty || qty <= 0) {
      alert("Enter valid received quantity");
      return;
    }

    try {
      await axios.post(`/grn/grn/${activePR._id}`, {
        receivedQty: qty,
        damagedQty: dmg,
        remarks
      });

      toast.success("Material received successfully");

      setActivePR(null);
      setReceivedQty("");
      setDamagedQty("");
      setRemarks("");

      fetchPRs();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Failed to add GRN");
    }
  };

  /* ================= CALCULATE ================= */
const totalReceived = (grns = []) =>
  grns.reduce((sum, g) => sum + g.receivedQty + (g.damagedQty || 0), 0);


  return (
    <div className="min-h-screen p-4 md:p-2">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <FaBoxOpen className="text-indigo-600 text-3xl" />
        <h1 className="text-2xl font-semibold text-gray-800">
          Store – Goods Receipt (GRN)
        </h1>
      </div>

      {loading && (
        <p className="text-center text-gray-500 mt-10">Loading...</p>
      )}

      {!loading && prs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No materials pending for receipt
        </p>
      )}

      {/* PR LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {prs.map((p) => {
          const received = totalReceived(p.grns);
          const pending = p.quantity - received;
          const percent = ((received / p.quantity) * 100).toFixed(1);

          return (
            <div key={p._id} className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold">{p.materialName}</h3>

              <div className="mt-3 text-sm space-y-1">
                <p><b>Ordered:</b> {p.quantity}</p>
                <p><b>Received:</b> {received}</p>
                <p><b>Pending:</b> {pending}</p>
                <p><b>Completed:</b> {percent}%</p>
              </div>

              {/* PROGRESS */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <button
                onClick={() => setActivePR(p)}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                <FaPlusCircle />
                Add Receipt
              </button>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
     {/* MODAL */}
{activePR && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">

      {/* CLOSE X BUTTON */}
      <button
        onClick={() => setActivePR(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-3">Receive Material</h2>
      <p className="text-sm text-gray-500 mb-4">
        {activePR.materialName}
      </p>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Received Qty"
          value={receivedQty}
          onChange={(e) => setReceivedQty(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Damaged Qty"
          value={damagedQty}
          onChange={(e) => setDamagedQty(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => setActivePR(null)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={submitGRN}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Save Receipt
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

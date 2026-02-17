import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaWallet, FaReceipt, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AccountsPaymentHistory() {
  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/account/payment-history");
      setPRs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load payment history");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-2">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
          <FaWallet className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Payment History
          </h1>
          <p className="text-sm text-slate-500">
            Completed cash transactions
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-slate-500 mt-10">Loading...</p>
      )}

      {/* EMPTY */}
      {!loading && prs.length === 0 && (
        <p className="text-center text-slate-500 mt-10">
          No completed payments found
        </p>
      )}

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
        {prs.map((p) => {

          const payment = p.paymentDetails;

          return (
            <div
              key={p._id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-green-600"
            >
              {/* BADGE */}
              <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <FaCheckCircle />
                Payment Completed
              </span>

              {/* MATERIAL */}
              <h3 className="text-lg font-semibold text-slate-800">
                {p.materialName}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Quantity: <b>{p.quantity}</b>
              </p>

              {/* PAYMENT INFO */}
              <div className="mt-5 space-y-2 text-sm text-slate-700">
                <p className="flex items-center gap-2">
                  <FaReceipt className="text-indigo-600" />
                  <span>
                    <b>Receipt No:</b> {payment?.receiptNo || "-"}
                  </span>
                </p>

                <p>
                  <b>Paid At:</b>{" "}
                  {payment?.paymentDate
                    ? new Date(payment.paymentDate).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

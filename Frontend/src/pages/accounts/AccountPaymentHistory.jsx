// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { FaWallet, FaReceipt, FaCheckCircle } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function AccountsPaymentHistory() {
//   const [prs, setPRs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/account/payment-history");
//       setPRs(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load payment history");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-2">
      
//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
//           <FaWallet className="text-white text-xl" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">
//             Payment History
//           </h1>
//           <p className="text-sm text-slate-500">
//             Completed cash transactions
//           </p>
//         </div>
//       </div>

//       {/* LOADING */}
//       {loading && (
//         <p className="text-center text-slate-500 mt-10">Loading...</p>
//       )}

//       {/* EMPTY */}
//       {!loading && prs.length === 0 && (
//         <p className="text-center text-slate-500 mt-10">
//           No completed payments found
//         </p>
//       )}

//       {/* CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
//         {prs.map((p) => {

//           const payment = p.paymentDetails;

//           return (
//             <div
//               key={p._id}
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-green-600"
//             >
//               {/* BADGE */}
//               <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
//                 <FaCheckCircle />
//                 Payment Completed
//               </span>

//               {/* MATERIAL */}
//               <h3 className="text-lg font-semibold text-slate-800">
//                 {p.materialName}
//               </h3>

//               <p className="text-sm text-slate-500 mt-1">
//                 Quantity: <b>{p.quantity}</b>
//               </p>

//               {/* PAYMENT INFO */}
//               <div className="mt-5 space-y-2 text-sm text-slate-700">
//                 <p className="flex items-center gap-2">
//                   <FaReceipt className="text-indigo-600" />
//                   <span>
//                     <b>Receipt No:</b> {payment?.receiptNo || "-"}
//                   </span>
//                 </p>

//                 <p>
//                   <b>Paid At:</b>{" "}
//                   {payment?.paymentDate
//                     ? new Date(payment.paymentDate).toLocaleString()
//                     : "-"}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaWallet, FaReceipt, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function AccountsPaymentHistory() {
  const [prs,     setPRs]     = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchHistory(); }, []);

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

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <FaWallet className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Payment History
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Completed cash transactions
          </p>
        </div>
      </div>

      {/* ── LOADING ── */}
      {loading && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          Loading...
        </p>
      )}

      {/* ── EMPTY ── */}
      {!loading && prs.length === 0 && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          No completed payments found
        </p>
      )}

      {/* ── CARDS ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {prs.map((p) => {
          const payment = p.paymentDetails;
          return (
            <div
              key={p._id}
              className="relative p-6 rounded-2xl transition-all"
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderLeft: "4px solid #10b981",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(16,185,129,0.12)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"}
            >
              {/* Badge */}
              <span
                className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#34d399",
                }}
              >
                <FaCheckCircle />
                Payment Completed
              </span>

              {/* Material */}
              <h3 className="text-base font-semibold mt-1" style={{ color: TEXT1 }}>
                {p.materialName}
              </h3>
              <p className="text-sm mt-1" style={{ color: TEXT2 }}>
                Quantity: <span className="font-semibold" style={{ color: TEXT1 }}>{p.quantity}</span>
              </p>

              {/* Payment info */}
              <div
                className="mt-5 space-y-3 pt-4 text-sm"
                style={{ borderTop: `1px solid ${BORDER}` }}
              >
                <p className="flex items-center gap-2" style={{ color: TEXT2 }}>
                  <FaReceipt style={{ color: VIOLET }} />
                  <span>
                    Receipt No:{" "}
                    <span className="font-semibold" style={{ color: TEXT1 }}>
                      {payment?.receiptNo || "-"}
                    </span>
                  </span>
                </p>

                <p style={{ color: TEXT2 }}>
                  Paid At:{" "}
                  <span className="font-semibold" style={{ color: TEXT1 }}>
                    {payment?.paymentDate
                      ? new Date(payment.paymentDate).toLocaleString()
                      : "-"}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
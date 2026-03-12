// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { FaBoxes } from "react-icons/fa";

// export default function RawMaterial() {
//   const [materials, setMaterials] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("/grn/raw-materials");
//       setMaterials(res.data);
//     } catch {
//       console.log("failed");
//     }
//   };

//   return (
//     <div className="p-2">
//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-6">
//         <FaBoxes className="text-indigo-600 text-2xl" />
//         <h1 className="text-2xl font-bold">Raw Material Status</h1>
//       </div>

//       {materials.length === 0 && (
//         <p className="text-gray-500 text-center mt-10">
//           No raw material received yet
//         </p>
//       )}

//       <div className="grid lg:grid-cols-2 gap-6">
//         {materials.map((m) => {
//           const received = m.quantityReceived || 0;
//           const percent = ((received / m.quantity) * 100).toFixed(1);
//           const isFull = received >= m.quantity;

//           return (
//             <div
//               key={m._id}
//               className="relative bg-white rounded-xl shadow p-5"
//             >
//               {/* 🔷 TOP RIGHT BADGE */}
//               {isFull && (
//                 <span className="
//                   absolute top-3 right-3
//                   bg-green-600 text-white
//                   text-xs px-3 py-1 rounded-full
//                   shadow
//                 ">
//                   FULLY RECEIVED
//                 </span>
//               )}

//               <h3 className="font-semibold text-lg">
//                 {m.materialName}
//               </h3>

//               <p className="text-sm mt-2">
//                 Ordered: <b>{m.quantity}</b>
//               </p>

//               <p className="text-sm text-green-600">
//                 Received: <b>{received}</b>
//               </p>

//               <p className="text-sm">
//                 Completion: <b>{percent}%</b>
//               </p>

//               {/* PROGRESS BAR */}
//               <div className="w-full bg-gray-200 h-2 rounded mt-3">
//                 <div
//                   className={`h-2 rounded ${
//                     isFull ? "bg-green-600" : "bg-indigo-600"
//                   }`}
//                   style={{ width: `${percent}%` }}
//                 />
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
import { FaBoxes } from "react-icons/fa";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function RawMaterial() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("/grn/raw-materials");
      setMaterials(res.data);
    } catch { console.log("failed"); }
  };

  return (
    <div className="p-2">

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <FaBoxes className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            Raw Material Status
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Inventory & received quantities
          </p>
        </div>
      </div>

      {/* ── EMPTY ── */}
      {materials.length === 0 && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          No raw material received yet
        </p>
      )}

      {/* ── CARDS ── */}
      <div className="grid lg:grid-cols-2 gap-5">
        {materials.map((m) => {
          const received = m.quantityReceived || 0;
          const percent  = Math.min(((received / m.quantity) * 100), 100).toFixed(1);
          const isFull   = received >= m.quantity;

          return (
            <div
              key={m._id}
              className="relative p-5 rounded-2xl transition-all"
              style={{
                background: CARD,
                border: `1px solid ${isFull ? "rgba(16,185,129,0.3)" : BORDER}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 32px rgba(${isFull ? "16,185,129" : "99,102,241"},0.12)`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"}
            >
              {/* Fully received badge */}
              {isFull && (
                <span
                  className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.35)",
                    color: "#34d399",
                  }}
                >
                  FULLY RECEIVED
                </span>
              )}

              {/* Material name */}
              <h3 className="font-semibold text-base mb-4" style={{ color: TEXT1 }}>
                {m.materialName}
              </h3>

              {/* Stats */}
              <div
                className="space-y-2 text-sm pb-4"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              >
                <div className="flex justify-between">
                  <span style={{ color: TEXT2 }}>Ordered</span>
                  <span className="font-semibold" style={{ color: TEXT1 }}>{m.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: TEXT2 }}>Received</span>
                  <span className="font-semibold" style={{ color: "#34d399" }}>{received}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: TEXT2 }}>Completion</span>
                  <span
                    className="font-semibold"
                    style={{ color: isFull ? "#34d399" : VIOLET }}
                  >
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="w-full h-2 rounded-full mt-4"
                style={{ background: "rgba(99,102,241,0.12)" }}
              >
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${percent}%`,
                    background: isFull
                      ? "linear-gradient(90deg, #10b981, #34d399)"
                      : `linear-gradient(90deg, ${INDIGO}, ${VIOLET})`,
                    boxShadow: isFull
                      ? "0 0 8px rgba(16,185,129,0.4)"
                      : "0 0 8px rgba(99,102,241,0.4)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { motion } from "framer-motion";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function EmployeeDashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     const res = await axios.get("/employeedashboard/stats");
//     setData(res.data);
//   };

//   if (!data) {
//     return <div className="p-10 text-center">Loading dashboard...</div>;
//   }

//   return (
//     <div className="w-full min-w-0 px-2 md:px-2 xl:px-2">


//       {/* HEADER */}
//       <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
//         <h1 className="text-2xl font-bold">
//           {data.type} Employee Dashboard
//         </h1>
//         <p className="text-indigo-100 mt-1 text-sm">
//           Welcome back, manage your activity
//         </p>
//       </div>

//       {/* PURCHASE */}
//       {data.type === "Purchase" && (
//         <DashboardUI
//           cards={[
//             { title: "My Requests", value: data.total },
//             { title: "Pending Requests", value: data.pending },
//             { title: "Receiving", value: data.receiving }
//           ]}
//           monthly={data.monthly}
//         />
//       )}

//       {/* SALES */}
//       {data.type === "Sales" && (
//         <DashboardUI
//           cards={[
//             { title: "My Sales", value: data.totalSales },
//             { title: "Orders", value: data.orders }
//           ]}
//           monthly={data.monthly}
//         />
//       )}

//       {/* MANUFACTURING */}
//       {data.type === "Manufacturing" && (
//         <DashboardUI
//           cards={[
//             { title: "Completed", value: data.completed },
//             { title: "Pending", value: data.pending }
//           ]}
//           monthly={data.monthly}
//         />
//       )}

//       {/* ACCOUNT */}
//       {data.type === "Account" && (
//         <DashboardUI
//           cards={[
//             { title: "Pending Invoices", value: data.invoices }
//           ]}
//           monthly={data.monthly}
//         />
//       )}
//     </div>
//   );
// }

// /* ===================================================== */

// function DashboardUI({ cards, monthly }) {
//   const colors = [
//     "from-indigo-500 to-indigo-600",
//     "from-emerald-500 to-emerald-600",
//     "from-orange-500 to-orange-600"
//   ];

//   /* 🔥 CHART.JS DATA */
//   const chartData = {
//     labels: (monthly || []).map(m => m.month),
//     datasets: [
//       {
//         label: "Total",
//         data: (monthly || []).map(m => m.total || 0),
//         backgroundColor: "#6366f1",
//         borderRadius: 6
//       }
//     ]
//   };

//   const chartOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: v => v.toLocaleString()
//         }
//       }
//     }
//   };

//   return (
//     <>
//       {/* CARDS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {cards.map((c, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ y: -6 }}
//             transition={{ duration: 0.2 }}
//             className={`rounded-2xl p-6 text-white shadow bg-gradient-to-r ${colors[i % 3]}`}
//           >
//             <p className="text-sm opacity-90">{c.title}</p>
//             <h2 className="text-3xl font-bold mt-1">
//               {c.value?.toLocaleString?.() ?? 0}
//             </h2>
//           </motion.div>
//         ))}
//       </div>

//       {/* CHART */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <h3 className="font-semibold mb-4 text-slate-700">
//           Monthly Activity
//         </h3>

//         <div className="h-[320px] w-full min-w-0">

//           <Bar data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/* ── Theme tokens (identical to AdminDashboard) ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function EmployeeDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await axios.get("/employeedashboard/stats");
    setData(res.data);
  };

  if (!data) {
    return (
      <div className="p-10 text-center text-sm" style={{ color: TEXT2 }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 px-2">

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl p-6 mb-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(99,102,241,0.35), rgba(167,139,250,0.2))`,
          border: `1px solid rgba(99,102,241,0.35)`,
          boxShadow: "0 8px 32px rgba(99,102,241,0.2)",
        }}
      >
        {/* Decorative glow blob */}
        <div style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "rgba(167,139,250,0.15)", filter: "blur(40px)",
          pointerEvents: "none",
        }} />

        <h1 className="text-2xl font-bold relative z-10" style={{ color: TEXT1 }}>
          {data.type} Employee Dashboard
        </h1>
        <p className="text-sm mt-1 relative z-10" style={{ color: TEXT2 }}>
          Welcome back, manage your activity
        </p>
      </motion.div>

      {/* ── DEPARTMENT VIEWS ── */}
      {data.type === "Purchase" && (
        <DashboardUI
          cards={[
            { title: "My Requests",      value: data.total,     color: INDIGO },
            { title: "Pending Requests", value: data.pending,   color: "#f59e0b" },
            { title: "Receiving",        value: data.receiving, color: "#10b981" },
          ]}
          monthly={data.monthly}
        />
      )}

      {data.type === "Sales" && (
        <DashboardUI
          cards={[
            { title: "My Sales", value: data.totalSales, color: "#10b981" },
            { title: "Orders",   value: data.orders,     color: INDIGO },
          ]}
          monthly={data.monthly}
        />
      )}

      {data.type === "Manufacturing" && (
        <DashboardUI
          cards={[
            { title: "Completed", value: data.completed, color: "#10b981" },
            { title: "Pending",   value: data.pending,   color: "#f59e0b" },
          ]}
          monthly={data.monthly}
        />
      )}

      {data.type === "Account" && (
        <DashboardUI
          cards={[
            { title: "Pending Invoices", value: data.invoices, color: INDIGO },
          ]}
          monthly={data.monthly}
        />
      )}
    </div>
  );
}

/* ── DASHBOARD UI ── */
function DashboardUI({ cards, monthly }) {

  const chartData = {
    labels: (monthly || []).map(m => m.month),
    datasets: [
      {
        label: "Total",
        data: (monthly || []).map(m => m.total || 0),
        backgroundColor: "rgba(99,102,241,0.7)",
        hoverBackgroundColor: VIOLET,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(22,20,48,0.95)",
        borderColor: BORDER,
        borderWidth: 1,
        titleColor: TEXT1,
        bodyColor: TEXT2,
        padding: 10,
        cornerRadius: 10,
      }
    },
    scales: {
      x: {
        grid:  { color: "rgba(99,102,241,0.08)", drawBorder: false },
        ticks: { color: TEXT2, font: { size: 12 } },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        grid:  { color: "rgba(99,102,241,0.08)", drawBorder: false },
        ticks: {
          color: TEXT2,
          font: { size: 12 },
          callback: v => v.toLocaleString(),
        },
        border: { display: false },
      }
    }
  };

  return (
    <>
      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative rounded-2xl p-6 overflow-hidden"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderLeft: `4px solid ${c.color}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Glow accent */}
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: "100px", height: "100px", borderRadius: "50%",
              background: `${c.color}18`,
              filter: "blur(30px)",
              pointerEvents: "none",
            }} />

            <p className="text-sm relative z-10" style={{ color: TEXT2 }}>
              {c.title}
            </p>
            <h2 className="text-3xl font-bold mt-2 relative z-10" style={{ color: TEXT1 }}>
              {c.value?.toLocaleString?.() ?? 0}
            </h2>

            {/* Bottom color dot */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full"
              style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
          </motion.div>
        ))}
      </div>

      {/* ── CHART ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-6"
        style={{
          background: CARD,
          border: `1px solid ${BORDER}`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-2 h-6 rounded-full"
            style={{ background: `linear-gradient(180deg, ${INDIGO}, ${VIOLET})` }}
          />
          <h3 className="font-semibold text-sm" style={{ color: TEXT1 }}>
            Monthly Activity
          </h3>
        </div>

        <div className="h-[320px] w-full min-w-0">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </motion.div>
    </>
  );
}
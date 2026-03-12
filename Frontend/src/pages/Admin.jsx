// import { useEffect, useState } from "react";
// import axios from "../api/axios";
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

// export default function Admin() {
//   const [data, setData] = useState(null);
//   const user = { department: localStorage.getItem("department") };

//   useEffect(() => { load(); }, []);

//   const load = async () => {
//     const res = await axios.get("/admindashboard/stats");
//     setData(res.data);
//   };

//   if (!data) return <div className="p-10 text-center">Loading...</div>;

//   return (
 
//   <div className="w-full min-w-0 px-2 md:px-2 xl:px-2">
    

//     {/* HEADER */}
//       <div className="rounded-2xl p-6 mb-8 bg-indigo-600 text-white shadow">
//         <h1 className="text-2xl font-semibold">
//           {user.department} Admin Dashboard
//         </h1>
//         <p className="text-indigo-100 text-sm mt-1">
//           Overview of {user.department} department performance
//         </p>
//       </div>

//       {/* PURCHASE */}
//       {user.department === "Purchase" && (
//         <DashboardUI
//           cards={[
//             { title: "Total Purchase", value: data.totalPurchase },
//             { title: "Pending PR", value: data.pendingPR },
//             { title: "Employees", value: data.employees }
//           ]}
//           monthly={data.monthly}
//           label="Total Purchase"
//         />
//       )}

//       {/* SALES */}
//       {user.department === "Sales" && (
//         <DashboardUI
//           cards={[
//             { title: "Total Sales", value: data.totalSales },
//             { title: "Orders", value: data.totalOrders },
//             { title: "Employees", value: data.employees }
//           ]}
//           monthly={data.monthly}
//           label="Total Sales"
//         />
//       )}

//       {/* ACCOUNT */}
//       {user.department === "Account" && (
//         <DashboardUI
//           cards={[
//             { title: "Revenue", value: data.revenue },
//             { title: "Pending Payments", value: data.pendingPayments },
//             { title: "Employees", value: data.employees }
//           ]}
//           monthly={data.monthly}
//           label="Revenue"
//         />
//       )}

//       {/* MANUFACTURING */}
//       {user.department === "Manufacturing" && (
//         <DashboardUI
//           cards={[
//             { title: "Completed", value: data.totalProduction },
//             { title: "Pending", value: data.pending },
//             { title: "Employees", value: data.employees }
//           ]}
//           monthly={data.wireTypeStats}
//           label="Production"
//           isWireType
//         />
//       )}
      
//     </div>
//   );
// }

// /* ================= DASHBOARD UI ================= */

// function DashboardUI({ cards, monthly = [], label, isWireType=false }) {

//   const values = monthly.map(m =>
//     Number(m.value ?? m.total ?? m.amount ?? m.qty ?? 0)
//   );

//   const labels = monthly.map(m =>
//     isWireType ? m.wireType : m.month
//   );

//   const barData = {
//     labels,
//     datasets: [{
//       label,
//       data: values,
//       backgroundColor: "#6366f1",
//       borderRadius: 8,
//       barThickness: 40
//     }]
//   };

//   const options = {
//     maintainAspectRatio: false,
//     plugins: { legend: { display: false } },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { callback: v => v.toLocaleString() }
//       }
//     }
//   };

//   /* 🎨 CARD COLORS */
//   const cardColors = [
//     "from-indigo-500 to-indigo-600",
//     "from-emerald-500 to-emerald-600",
//     "from-orange-500 to-orange-600"
//   ];

//   return (
//     <>
//       {/* CARDS */}
//       <div className="grid grid-cols-1  xl:grid-cols-3 gap-6 mb-8 w-full">

//   {cards.map((c,i)=>(
//     <div
//       key={i}
//       className={`text-white p-6 rounded-2xl shadow-lg bg-gradient-to-r ${cardColors[i]}
//       transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
//     >
//       <p className="opacity-80 text-sm">{c.title}</p>
//       <h2 className="text-3xl font-bold mt-2">
//         {c.value?.toLocaleString?.() ?? 0}
//       </h2>
//     </div>
//   ))}
// </div>


//       {/* CHART */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <h3 className="font-semibold mb-4 text-lg">
//           {isWireType ? "Production by Wire Type" : `Monthly ${label}`}
//         </h3>

//        <div className="h-[350px] w-full min-w-0">


//           <Bar data={barData} options={options} />
//         </div>
//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../api/axios";
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

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function Admin() {
  const [data, setData] = useState(null);
  const user = { department: localStorage.getItem("department") };

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await axios.get("/admindashboard/stats");
    setData(res.data);
  };

  if (!data) return (
    <div className="p-10 text-center text-sm" style={{ color: TEXT2 }}>
      Loading...
    </div>
  );

  return (
    <div className="w-full min-w-0 px-2">

      {/* ── HEADER BANNER ── */}
      <div
        className="rounded-2xl p-6 mb-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(167,139,250,0.2))",
          border: `1px solid rgba(99,102,241,0.35)`,
          boxShadow: "0 4px 24px rgba(99,102,241,0.15)",
        }}
      >
        {/* top glow line */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "240px", height: "1px",
          background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
        }} />
        <h1 className="text-2xl font-semibold" style={{ color: TEXT1 }}>
          {user.department} Admin Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: TEXT2 }}>
          Overview of {user.department} department performance
        </p>
      </div>

      {user.department === "Purchase" && (
        <DashboardUI
          cards={[
            { title: "Total Purchase", value: data.totalPurchase, accent: INDIGO,   bg: "rgba(99,102,241,0.12)"  },
            { title: "Pending PR",     value: data.pendingPR,     accent: "#10b981", bg: "rgba(16,185,129,0.12)" },
            { title: "Employees",      value: data.employees,     accent: "#f97316", bg: "rgba(249,115,22,0.12)" },
          ]}
          monthly={data.monthly}
          label="Total Purchase"
        />
      )}

      {user.department === "Sales" && (
        <DashboardUI
          cards={[
            { title: "Total Sales", value: data.totalSales,   accent: INDIGO,   bg: "rgba(99,102,241,0.12)"  },
            { title: "Orders",      value: data.totalOrders,  accent: "#10b981", bg: "rgba(16,185,129,0.12)" },
            { title: "Employees",   value: data.employees,    accent: "#f97316", bg: "rgba(249,115,22,0.12)" },
          ]}
          monthly={data.monthly}
          label="Total Sales"
        />
      )}

      {user.department === "Account" && (
        <DashboardUI
          cards={[
            { title: "Revenue",          value: data.revenue,         accent: INDIGO,   bg: "rgba(99,102,241,0.12)"  },
            { title: "Pending Payments", value: data.pendingPayments, accent: "#10b981", bg: "rgba(16,185,129,0.12)" },
            { title: "Employees",        value: data.employees,       accent: "#f97316", bg: "rgba(249,115,22,0.12)" },
          ]}
          monthly={data.monthly}
          label="Revenue"
        />
      )}

      {user.department === "Manufacturing" && (
        <DashboardUI
          cards={[
            { title: "Completed", value: data.totalProduction, accent: INDIGO,   bg: "rgba(99,102,241,0.12)"  },
            { title: "Pending",   value: data.pending,         accent: "#10b981", bg: "rgba(16,185,129,0.12)" },
            { title: "Employees", value: data.employees,       accent: "#f97316", bg: "rgba(249,115,22,0.12)" },
          ]}
          monthly={data.wireTypeStats}
          label="Production"
          isWireType
        />
      )}
    </div>
  );
}

/* ── DASHBOARD UI ── */
function DashboardUI({ cards, monthly = [], label, isWireType = false }) {

  const values = monthly.map(m => Number(m.value ?? m.total ?? m.amount ?? m.qty ?? 0));
  const labels = monthly.map(m => isWireType ? m.wireType : m.month);

  const barData = {
    labels,
    datasets: [{
      label,
      data: values,
      backgroundColor: "rgba(99,102,241,0.75)",
      hoverBackgroundColor: VIOLET,
      borderRadius: 8,
      barThickness: 40,
    }]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(22,20,48,0.97)",
        borderColor: "rgba(99,102,241,0.35)",
        borderWidth: 1,
        titleColor: TEXT1,
        bodyColor: TEXT2,
        padding: 10,
        callbacks: { label: ctx => ` ${ctx.parsed.y.toLocaleString()}` }
      }
    },
    scales: {
      x: {
        ticks: { color: TEXT2, font: { size: 12 } },
        grid:  { color: "rgba(99,102,241,0.07)" },
        border: { color: "transparent" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: TEXT2, callback: v => v.toLocaleString(), font: { size: 12 } },
        grid:  { color: "rgba(99,102,241,0.07)" },
        border: { color: "transparent" },
      }
    }
  };

  return (
    <>
      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8 w-full">
        {cards.map((c, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderLeft: `4px solid ${c.accent}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 32px ${c.accent}25`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"}
          >
            {/* Icon box */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{ background: c.bg, border: `1px solid ${c.accent}35` }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: c.accent }} />
            </div>

            <p className="text-sm mb-1" style={{ color: TEXT2 }}>{c.title}</p>
            <h2 className="text-3xl font-bold" style={{ color: TEXT1 }}>
              {c.value?.toLocaleString?.() ?? 0}
            </h2>
          </div>
        ))}
      </div>

      {/* ── CHART ── */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: CARD,
          border: `1px solid ${BORDER}`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        <h3 className="font-semibold text-lg mb-5" style={{ color: TEXT1 }}>
          {isWireType ? "Production by Wire Type" : `Monthly ${label}`}
        </h3>
        <div className="h-[350px] w-full min-w-0">
          <Bar data={barData} options={options} />
        </div>
      </div>
    </>
  );
}
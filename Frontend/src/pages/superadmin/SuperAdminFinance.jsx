// import { useEffect, useState, useRef } from "react";
// import axios from "../../api/axios";
// import { motion } from "framer-motion";
// import {
//   FaCalendar,
//   FaFilePdf,
//   FaChartLine,
//   FaMoneyBillWave,
//   FaCubes,
//   FaIndustry
// } from "react-icons/fa";

// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// import { Bar, Line } from "react-chartjs-2";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// export default function SuperAdminFinance() {

//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());

//   const [data, setData] = useState({
//     purchase: 0,
//     sales: 0,
//     vendorPaid: 0,
//     clientReceived: 0,
//     rawTypes: {},
//     wireMade: {},
//     wireSold: {},
//     readyStock: {},
//     lastMonthSales: 0,
//     lastMonthPurchase: 0
//   });

//   const pdfRef = useRef();

//   useEffect(() => {
//     fetchData();
//   }, [month]);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`/superadmin/finance?month=${month}&year=${year}`);
//       setData(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   /* ================= PDF EXPORT ================= */
//   const exportPDF = async () => {

//     await new Promise(resolve => setTimeout(resolve, 600));

//     const canvas = await html2canvas(pdfRef.current, {
//       scale: 2,
//       backgroundColor: "#ffffff",
//       useCORS: true,

//       // 🔥 THIS FIXES OKLCH ERROR
//       onclone: (doc) => {
//         const all = doc.querySelectorAll("*");

//         all.forEach(el => {
//           const style = doc.defaultView.getComputedStyle(el);

//           // convert unsupported colors
//           if (style.backgroundColor.includes("oklch")) {
//             el.style.backgroundColor = "#ffffff";
//           }
//           if (style.color.includes("oklch")) {
//             el.style.color = "#000000";
//           }
//           if (style.borderColor.includes("oklch")) {
//             el.style.borderColor = "#e5e7eb";
//           }
//         });
//       }
//     });

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");

//     const imgWidth = 210;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//     pdf.save("finance-report.pdf");
//   };
//   /* ================= CALCULATIONS ================= */

//   const profit = data.sales - data.purchase;

//   const growth =
//     data.lastMonthSales === 0
//       ? 0
//       : ((data.sales - data.lastMonthSales) / data.lastMonthSales) * 100;

//   /* ================= CHART DATA ================= */

//   const barData = {
//     labels: ["Purchase", "Sales"],
//     datasets: [{
//       label: "Monthly",
//       data: [data.purchase, data.sales],
//       backgroundColor: ["#6366f1", "#10b981"]
//     }]
//   };

//   const cashFlowData = {
//     labels: ["Vendor Paid", "Client Received"],
//     datasets: [{
//       label: "Cash Flow",
//       data: [data.vendorPaid, data.clientReceived],
//       borderColor: "#6366f1",
//       backgroundColor: "#6366f1"
//     }]
//   };

//   return (
//     <div className="min-h-screen px-3 sm:px-4 md:px-2">

//       {/* HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
//             <FaChartLine className="text-white text-base sm:text-lg" />
//           </div>

//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold">
//               Superadmin Finance
//             </h1>
//             <p className="text-gray-500 text-xs sm:text-sm">
//               Monthly financial overview
//             </p>
//           </div>
//         </div>

//         {/* FILTER + PDF */}
//         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

//           <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow w-full sm:w-auto">
//             <FaCalendar />
//             <select
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               className="outline-none bg-transparent w-full"
//             >
//               {Array.from({ length: 12 }).map((_, i) => (
//                 <option key={i} value={i + 1}>
//                   {new Date(0, i).toLocaleString("default", { month: "long" })}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             onClick={exportPDF}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl 
//           flex items-center justify-center gap-2 shadow 
//           cursor-pointer 
//           transition-all duration-200 
//           hover:shadow-lg 
//           hover:-translate-y-0.5 
//           active:scale-95 w-full sm:w-auto"
//           >
//             <FaFilePdf />
//             Export PDF
//           </button>

//         </div>
//       </div>

//       {/* CONTENT FOR PDF */}
//       <div ref={pdfRef}>

//         {/* TOP CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

//           <Card title="Total Purchase" value={data.purchase} color="bg-indigo-600" />
//           <Card title="Total Sales" value={data.sales} color="bg-green-600" />
//           <Card title="Vendor Paid" value={data.vendorPaid} color="bg-red-600" />
//           <Card title="Client Received" value={data.clientReceived} color="bg-purple-600" />

//         </div>

//         {/* PROFIT + GROWTH */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">

//           <motion.div className="bg-white rounded-3xl p-4 sm:p-6 shadow">
//             <div className="flex items-center gap-2 mb-2">
//               <FaMoneyBillWave />
//               <h2 className="font-semibold">Profit</h2>
//             </div>
//             <div className="text-2xl sm:text-3xl font-bold text-green-600">
//               ₹ {profit.toLocaleString()}
//             </div>
//           </motion.div>

//           <motion.div className="bg-white rounded-3xl p-4 sm:p-6 shadow">
//             <div className="flex items-center gap-2 mb-2">
//               <FaChartLine />
//               <h2 className="font-semibold">Growth</h2>
//             </div>
//             <div className={`text-2xl sm:text-3xl font-bold ${growth >= 0 ? "text-green-600" : "text-red-600"}`}>
//               {growth.toFixed(1)}%
//             </div>
//           </motion.div>
//           {/* RAW MATERIAL CARD */}
//           <motion.div className="bg-white rounded-3xl p-6 shadow">
//             <div className="flex items-center gap-2 mb-3">
//               <FaCubes className="text-orange-600" />
//               <h2 className="font-semibold">Raw Material Stock</h2>
//             </div>

//             {Object.entries(data.rawTypes).map(([name, qty]) => (
//               <div key={name} className="flex justify-between text-sm py-1">
//                 <span>{name}</span>
//                 <b>{qty}</b>
//               </div>
//             ))}
//           </motion.div>

//           {/* FINISHED PRODUCT CARD */}
//           <motion.div className="bg-white rounded-3xl p-6 shadow">
//             <div className="flex items-center gap-2 mb-3">
//               <FaIndustry className="text-indigo-600" />
//               <h2 className="font-semibold">Wire Stock</h2>
//             </div>

//             {Object.keys(data.readyStock).map(type => (
//               <div key={type} className="flex justify-between text-sm py-1">
//                 <span>{type} Wire</span>
//                 <b>{data.readyStock[type]}</b>
//               </div>
//             ))}
//           </motion.div>

//         </div>

//         {/* CHARTS */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mt-6">

//           <div className="bg-white rounded-3xl p-4 sm:p-6 shadow w-full overflow-x-auto">
//             <h2 className="font-semibold mb-3">Purchase vs Sales</h2>
//             <div className="min-h-[250px]">
//               <Bar data={barData} />
//             </div>
//           </div>

//           <div className="bg-white rounded-3xl p-4 sm:p-6 shadow w-full overflow-x-auto">
//             <h2 className="font-semibold mb-3">Cash Flow</h2>
//             <div className="min-h-[250px]">
//               <Line data={cashFlowData} />
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// function Card({ title, value, color }) {
//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       className="bg-white rounded-3xl p-6 shadow flex justify-between items-center"
//     >
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <h2 className="text-2xl font-bold mt-2">₹ {value.toLocaleString()}</h2>
//       </div>
//       <div className={`${color} w-12 h-12 rounded-xl`} />
//     </motion.div>
//   );
// }
import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FaCalendar, FaFilePdf, FaChartLine,
  FaMoneyBillWave, FaCubes, FaIndustry
} from "react-icons/fa";

import {
  Chart as ChartJS, BarElement, CategoryScale, LinearScale,
  PointElement, LineElement, Tooltip, Legend
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

const chartDefaults = {
  plugins: {
    legend: { labels: { color: TEXT1, font: { size: 12 } } },
    tooltip: {
      backgroundColor: "rgba(22,20,48,0.98)",
      titleColor: TEXT1,
      bodyColor: "#c4b5fd",
      borderColor: BORDER,
      borderWidth: 1,
    }
  },
  scales: {
    x: { ticks: { color: TEXT2 }, grid: { color: "rgba(99,102,241,0.08)" } },
    y: { ticks: { color: TEXT2 }, grid: { color: "rgba(99,102,241,0.08)" } },
  }
};

export default function SuperAdminFinance() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year]            = useState(new Date().getFullYear());
  const [data, setData]   = useState({
    purchase: 0, sales: 0, vendorPaid: 0, clientReceived: 0,
    rawTypes: {}, wireMade: {}, wireSold: {}, readyStock: {},
    lastMonthSales: 0, lastMonthPurchase: 0
  });
  const pdfRef = useRef();

  useEffect(() => { fetchData(); }, [month]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/superadmin/finance?month=${month}&year=${year}`);
      setData(res.data);
    } catch (err) { console.log(err); }
  };

  const exportPDF = async () => {
    await new Promise(r => setTimeout(r, 600));
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2, backgroundColor: "#ffffff", useCORS: true,
      onclone: (doc) => {
        doc.querySelectorAll("*").forEach(el => {
          const s = doc.defaultView.getComputedStyle(el);
          if (s.backgroundColor.includes("oklch")) el.style.backgroundColor = "#ffffff";
          if (s.color.includes("oklch"))            el.style.color = "#000000";
          if (s.borderColor.includes("oklch"))      el.style.borderColor = "#e5e7eb";
        });
      }
    });
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth  = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("finance-report.pdf");
  };

  const profit = data.sales - data.purchase;
  const growth = data.lastMonthSales === 0
    ? 0
    : ((data.sales - data.lastMonthSales) / data.lastMonthSales) * 100;

  const barData = {
    labels: ["Purchase", "Sales"],
    datasets: [{ label: "Monthly", data: [data.purchase, data.sales],
      backgroundColor: [INDIGO, "#10b981"], borderRadius: 6 }]
  };

  const cashFlowData = {
    labels: ["Vendor Paid", "Client Received"],
    datasets: [{ label: "Cash Flow", data: [data.vendorPaid, data.clientReceived],
      borderColor: VIOLET, backgroundColor: `${VIOLET}30`,
      pointBackgroundColor: VIOLET, tension: 0.4 }]
  };

  const infoCard = {
    background: CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  };

  return (
    <div className="min-h-screen px-3 sm:px-4 md:px-2">

      {/* ── HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, boxShadow: `0 0 20px rgba(99,102,241,0.4)` }}
          >
            <FaChartLine className="text-white text-base sm:text-lg" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold" style={{ color: TEXT1 }}>
              Superadmin Finance
            </h1>
            <p className="text-xs sm:text-sm" style={{ color: TEXT2 }}>
              Monthly financial overview
            </p>
          </div>
        </div>

        {/* Filter + PDF */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl w-full sm:w-auto"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <FaCalendar style={{ color: VIOLET }} />
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="outline-none bg-transparent w-full text-sm"
              style={{ color: TEXT1 }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i + 1} style={{ background: "#16143a", color: TEXT1 }}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={exportPDF}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all w-full sm:w-auto"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.25)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.15)"}
          >
            <FaFilePdf /> Export PDF
          </button>
        </div>
      </div>

      {/* ── PDF CONTENT ── */}
      <div ref={pdfRef} className="space-y-5">

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { title: "Total Purchase",   value: data.purchase,       accent: INDIGO    },
            { title: "Total Sales",      value: data.sales,          accent: "#10b981" },
            { title: "Vendor Paid",      value: data.vendorPaid,     accent: "#ef4444" },
            { title: "Client Received",  value: data.clientReceived, accent: "#a78bfa" },
          ].map((c, i) => (
            <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }}
              style={{
                background: CARD,
                border: `1px solid ${c.accent}30`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${c.accent}15 inset`,
                borderRadius: "16px", padding: "24px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: TEXT2 }}>{c.title}</p>
                <h2 className="text-2xl font-bold mt-1" style={{ color: TEXT1 }}>
                  ₹ {c.value.toLocaleString()}
                </h2>
              </div>
              <div style={{
                background: `${c.accent}20`, border: `1px solid ${c.accent}35`,
                borderRadius: "12px", width: "48px", height: "48px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: c.accent }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* PROFIT + GROWTH + STOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Profit */}
          <motion.div style={infoCard}>
            <div className="flex items-center gap-2 mb-3">
              <FaMoneyBillWave style={{ color: "#10b981" }} />
              <h2 className="font-semibold text-sm" style={{ color: TEXT1 }}>Profit</h2>
            </div>
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: profit >= 0 ? "#10b981" : "#ef4444" }}>
              ₹ {profit.toLocaleString()}
            </div>
          </motion.div>

          {/* Growth */}
          <motion.div style={infoCard}>
            <div className="flex items-center gap-2 mb-3">
              <FaChartLine style={{ color: VIOLET }} />
              <h2 className="font-semibold text-sm" style={{ color: TEXT1 }}>Growth</h2>
            </div>
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: growth >= 0 ? "#10b981" : "#ef4444" }}>
              {growth.toFixed(1)}%
            </div>
          </motion.div>

          {/* Raw Material Stock */}
          <motion.div style={infoCard}>
            <div className="flex items-center gap-2 mb-4">
              <FaCubes style={{ color: "#f59e0b" }} />
              <h2 className="font-semibold text-sm" style={{ color: TEXT1 }}>Raw Material Stock</h2>
            </div>
            {Object.entries(data.rawTypes).map(([name, qty]) => (
              <div key={name} className="flex justify-between text-sm py-2"
                style={{ borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ color: TEXT2 }}>{name}</span>
                <b style={{ color: TEXT1 }}>{qty}</b>
              </div>
            ))}
          </motion.div>

          {/* Wire Stock */}
          <motion.div style={infoCard}>
            <div className="flex items-center gap-2 mb-4">
              <FaIndustry style={{ color: INDIGO }} />
              <h2 className="font-semibold text-sm" style={{ color: TEXT1 }}>Wire Stock</h2>
            </div>
            {Object.keys(data.readyStock).map(type => (
              <div key={type} className="flex justify-between text-sm py-2"
                style={{ borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ color: TEXT2 }}>{type} Wire</span>
                <b style={{ color: TEXT1 }}>{data.readyStock[type]}</b>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div style={infoCard}>
            <h2 className="font-semibold text-sm mb-4" style={{ color: TEXT1 }}>Purchase vs Sales</h2>
            <div className="min-h-[250px]">
              <Bar data={barData} options={{ ...chartDefaults, maintainAspectRatio: false }} />
            </div>
          </div>

          <div style={infoCard}>
            <h2 className="font-semibold text-sm mb-4" style={{ color: TEXT1 }}>Cash Flow</h2>
            <div className="min-h-[250px]">
              <Line data={cashFlowData} options={{ ...chartDefaults, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaFilePdf,
  FaChartLine,
  FaMoneyBillWave,
  FaCubes,
  FaIndustry
} from "react-icons/fa";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function SuperAdminFinance() {

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [data, setData] = useState({
    purchase: 0,
    sales: 0,
    vendorPaid: 0,
    clientReceived: 0,
    rawTypes: {},
    wireMade: {},
    wireSold: {},
    readyStock: {},
    lastMonthSales: 0,
    lastMonthPurchase: 0
  });

  const pdfRef = useRef();

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/superadmin/finance?month=${month}&year=${year}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= PDF EXPORT ================= */
  const exportPDF = async () => {

    await new Promise(resolve => setTimeout(resolve, 600));

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,

      // 🔥 THIS FIXES OKLCH ERROR
      onclone: (doc) => {
        const all = doc.querySelectorAll("*");

        all.forEach(el => {
          const style = doc.defaultView.getComputedStyle(el);

          // convert unsupported colors
          if (style.backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "#ffffff";
          }
          if (style.color.includes("oklch")) {
            el.style.color = "#000000";
          }
          if (style.borderColor.includes("oklch")) {
            el.style.borderColor = "#e5e7eb";
          }
        });
      }
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("finance-report.pdf");
  };
  /* ================= CALCULATIONS ================= */

  const profit = data.sales - data.purchase;

  const growth =
    data.lastMonthSales === 0
      ? 0
      : ((data.sales - data.lastMonthSales) / data.lastMonthSales) * 100;

  /* ================= CHART DATA ================= */

  const barData = {
    labels: ["Purchase", "Sales"],
    datasets: [{
      label: "Monthly",
      data: [data.purchase, data.sales],
      backgroundColor: ["#6366f1", "#10b981"]
    }]
  };

  const cashFlowData = {
    labels: ["Vendor Paid", "Client Received"],
    datasets: [{
      label: "Cash Flow",
      data: [data.vendorPaid, data.clientReceived],
      borderColor: "#6366f1",
      backgroundColor: "#6366f1"
    }]
  };

  return (
    <div className="min-h-screen px-3 sm:px-4 md:px-2">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
            <FaChartLine className="text-white text-base sm:text-lg" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Superadmin Finance
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Monthly financial overview
            </p>
          </div>
        </div>

        {/* FILTER + PDF */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow w-full sm:w-auto">
            <FaCalendar />
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="outline-none bg-transparent w-full"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={exportPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl 
          flex items-center justify-center gap-2 shadow 
          cursor-pointer 
          transition-all duration-200 
          hover:shadow-lg 
          hover:-translate-y-0.5 
          active:scale-95 w-full sm:w-auto"
          >
            <FaFilePdf />
            Export PDF
          </button>

        </div>
      </div>

      {/* CONTENT FOR PDF */}
      <div ref={pdfRef}>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

          <Card title="Total Purchase" value={data.purchase} color="bg-indigo-600" />
          <Card title="Total Sales" value={data.sales} color="bg-green-600" />
          <Card title="Vendor Paid" value={data.vendorPaid} color="bg-red-600" />
          <Card title="Client Received" value={data.clientReceived} color="bg-purple-600" />

        </div>

        {/* PROFIT + GROWTH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">

          <motion.div className="bg-white rounded-3xl p-4 sm:p-6 shadow">
            <div className="flex items-center gap-2 mb-2">
              <FaMoneyBillWave />
              <h2 className="font-semibold">Profit</h2>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600">
              ₹ {profit.toLocaleString()}
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-3xl p-4 sm:p-6 shadow">
            <div className="flex items-center gap-2 mb-2">
              <FaChartLine />
              <h2 className="font-semibold">Growth</h2>
            </div>
            <div className={`text-2xl sm:text-3xl font-bold ${growth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {growth.toFixed(1)}%
            </div>
          </motion.div>
          {/* RAW MATERIAL CARD */}
          <motion.div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex items-center gap-2 mb-3">
              <FaCubes className="text-orange-600" />
              <h2 className="font-semibold">Raw Material Stock</h2>
            </div>

            {Object.entries(data.rawTypes).map(([name, qty]) => (
              <div key={name} className="flex justify-between text-sm py-1">
                <span>{name}</span>
                <b>{qty}</b>
              </div>
            ))}
          </motion.div>

          {/* FINISHED PRODUCT CARD */}
          <motion.div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex items-center gap-2 mb-3">
              <FaIndustry className="text-indigo-600" />
              <h2 className="font-semibold">Wire Stock</h2>
            </div>

            {Object.keys(data.readyStock).map(type => (
              <div key={type} className="flex justify-between text-sm py-1">
                <span>{type} Wire</span>
                <b>{data.readyStock[type]}</b>
              </div>
            ))}
          </motion.div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mt-6">

          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow w-full overflow-x-auto">
            <h2 className="font-semibold mb-3">Purchase vs Sales</h2>
            <div className="min-h-[250px]">
              <Bar data={barData} />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow w-full overflow-x-auto">
            <h2 className="font-semibold mb-3">Cash Flow</h2>
            <div className="min-h-[250px]">
              <Line data={cashFlowData} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-6 shadow flex justify-between items-center"
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold mt-2">₹ {value.toLocaleString()}</h2>
      </div>
      <div className={`${color} w-12 h-12 rounded-xl`} />
    </motion.div>
  );
}
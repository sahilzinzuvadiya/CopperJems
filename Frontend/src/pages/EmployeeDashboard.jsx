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

export default function EmployeeDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get("/employeedashboard/stats");
    setData(res.data);
  };

  if (!data) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="w-full min-w-0 px-2 md:px-2 xl:px-2">


      {/* HEADER */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
        <h1 className="text-2xl font-bold">
          {data.type} Employee Dashboard
        </h1>
        <p className="text-indigo-100 mt-1 text-sm">
          Welcome back, manage your activity
        </p>
      </div>

      {/* PURCHASE */}
      {data.type === "Purchase" && (
        <DashboardUI
          cards={[
            { title: "My Requests", value: data.total },
            { title: "Pending Requests", value: data.pending },
            { title: "Receiving", value: data.receiving }
          ]}
          monthly={data.monthly}
        />
      )}

      {/* SALES */}
      {data.type === "Sales" && (
        <DashboardUI
          cards={[
            { title: "My Sales", value: data.totalSales },
            { title: "Orders", value: data.orders }
          ]}
          monthly={data.monthly}
        />
      )}

      {/* MANUFACTURING */}
      {data.type === "Manufacturing" && (
        <DashboardUI
          cards={[
            { title: "Completed", value: data.completed },
            { title: "Pending", value: data.pending }
          ]}
          monthly={data.monthly}
        />
      )}

      {/* ACCOUNT */}
      {data.type === "Account" && (
        <DashboardUI
          cards={[
            { title: "Pending Invoices", value: data.invoices }
          ]}
          monthly={data.monthly}
        />
      )}
    </div>
  );
}

/* ===================================================== */

function DashboardUI({ cards, monthly }) {
  const colors = [
    "from-indigo-500 to-indigo-600",
    "from-emerald-500 to-emerald-600",
    "from-orange-500 to-orange-600"
  ];

  /* 🔥 CHART.JS DATA */
  const chartData = {
    labels: (monthly || []).map(m => m.month),
    datasets: [
      {
        label: "Total",
        data: (monthly || []).map(m => m.total || 0),
        backgroundColor: "#6366f1",
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: v => v.toLocaleString()
        }
      }
    }
  };

  return (
    <>
      {/* CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className={`rounded-2xl p-6 text-white shadow bg-gradient-to-r ${colors[i % 3]}`}
          >
            <p className="text-sm opacity-90">{c.title}</p>
            <h2 className="text-3xl font-bold mt-1">
              {c.value?.toLocaleString?.() ?? 0}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4 text-slate-700">
          Monthly Activity
        </h3>

        <div className="h-[320px] w-full min-w-0">

          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
}

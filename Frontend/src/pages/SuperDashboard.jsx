import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { Users, Shield, Building2, Wallet, AlertCircle, TrendingUp, ShoppingCart, IndianRupee } from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function SuperDashboard() {
  const [stats, setStats] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const s = await axios.get("/superadmin/stats");
      const a = await axios.get("/superadmin/analytics");

      setStats(s.data || {});
      setAnalytics(a.data || {});
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-10">Loading...</div>;

  /* ================= KPI ================= */
  const topCards = [
    { title: "Admins", value: stats.admins || 0, color: "from-indigo-500 to-indigo-600", icon: Shield },
    { title: "Employees", value: stats.employees || 0, color: "from-emerald-500 to-emerald-600", icon: Users },
    { title: "Clients", value: stats.clients || 0, color: "from-purple-500 to-purple-600", icon: Building2 }
  ];

  /* ================= CHART DATA ================= */
  const months = analytics.purchases?.map(p => p.month) || [];
  const purchaseMonthly = analytics.purchases?.map(p => p.total) || [];
  const salesMonthly = analytics.sales?.map(s => s.total) || [];

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Purchase",
        data: purchaseMonthly,
        backgroundColor: "#6366f1",
        borderRadius: 6
      },
      {
        label: "Sales",
        data: salesMonthly,
        backgroundColor: "#10b981",
        borderRadius: 6
      }
    ]
  };

  const donutData = {
    labels: ["Purchase", "Sales"],
    datasets: [
      {
        data: [
          analytics.summary?.totalPurchase || 0,
          analytics.summary?.totalSales || 0
        ],
        backgroundColor: ["#6366f1", "#10b981"]
      }
    ]
  };

  const rawPie = {
    labels: analytics.rawMaterials?.map(r => r.type) || [],
    datasets: [
      {
        data: analytics.rawMaterials?.map(r => r.qty) || [],
        backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#ef4444"]
      }
    ]
  };

  const wirePie = {
    labels: analytics.wires?.map(w => w.type) || [],
    datasets: [
      {
        data: analytics.wires?.map(w => w.qty) || [],
        backgroundColor: ["#8b5cf6", "#22c55e", "#f97316"]
      }
    ]
  };

  return (
    <div className="px-3 sm:px-4 md:px-4 py-4 space-y-6 w-full">



      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Super Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Business overview & analytics
        </p>
      </div>

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5">

        {topCards.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-gradient-to-br ${c.color} text-white p-6 rounded-2xl shadow-lg`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm opacity-80">{c.title}</p>
                <h2 className="text-2xl font-bold mt-1">{c.value}</h2>
              </div>
              <c.icon />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= WALLET + PENDING ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-5">


        {/* Wallet Balance Card */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="opacity-90">Wallet Balance</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {(analytics.walletBalance || 0).toLocaleString()}
            </h2>
          </div>

          <div className="bg-white/20 p-3 rounded-xl">
            <Wallet size={32} />
          </div>
        </motion.div>

        {/* Pending Payments */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="opacity-90">Pending Payments</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {(analytics.pendingClientPayments || 0).toLocaleString()}
            </h2>
          </div>

          <div className="bg-white/20 p-3 rounded-xl">
            <AlertCircle size={32} />
          </div>
        </motion.div>

        {/* 🟢 Payment Received Card */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="opacity-90">Payments Received</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {(analytics.totalReceivedPayments || 0).toLocaleString()}
            </h2>
          </div>

          <div className="bg-white/20 p-3 rounded-xl">
            <IndianRupee size={32} />
          </div>
        </motion.div>

      </div>



      {/* ================= TOTAL ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">


        {/* Total Purchase */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="opacity-90">Total Purchase</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {analytics.summary?.totalPurchase?.toLocaleString() || 0}
            </h2>
          </div>

          <div className="bg-white/20 p-3 rounded-xl">
            <ShoppingCart size={32} />
          </div>
        </motion.div>

        {/* Total Sales */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-green-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="opacity-90">Total Sales</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {analytics.summary?.totalSales?.toLocaleString() || 0}
            </h2>
          </div>

          <div className="bg-white/20 p-3 rounded-xl">
            <TrendingUp size={32} />
          </div>
        </motion.div>

      </div>

      {/* ================= CHART GRID ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <div className="bg-white p-5 rounded-2xl shadow overflow-hidden">
          <h3 className="font-semibold mb-4">Purchase vs Sales</h3>

          <div className="w-full overflow-x-auto">
            <div className="w-full">
              <Doughnut data={donutData} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow overflow-hidden">
          <h3 className="font-semibold mb-4">Raw Materials</h3>

          <div className="w-full overflow-x-auto">
            <div className="min-w-full h-full">

              <Pie data={rawPie} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow overflow-hidden">
          <h3 className="font-semibold mb-4">Wire Types</h3>

          <div className="w-full overflow-x-auto">
            <div className="w-full h-full">

              <Pie data={wirePie} />
            </div>
          </div>
        </div>

      </div>


      {/* ================= MONTHLY AT BOTTOM ================= */}
      <div className="bg-white p-5 rounded-2xl shadow overflow-hidden">

        <h3 className="font-semibold mb-4">
          Monthly Purchase vs Sales
        </h3>
        <div className="h-[350px] w-full overflow-x-auto">
          <div className="min-w-[300px] h-full">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

      </div>

    </div>
  );
}

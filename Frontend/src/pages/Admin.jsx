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

export default function Admin() {
  const [data, setData] = useState(null);
  const user = { department: localStorage.getItem("department") };

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await axios.get("/admindashboard/stats");
    setData(res.data);
  };

  if (!data) return <div className="p-10 text-center">Loading...</div>;

  return (
 
  <div className="w-full min-w-0 px-2 md:px-2 xl:px-2">
    

    {/* HEADER */}
      <div className="rounded-2xl p-6 mb-8 bg-indigo-600 text-white shadow">
        <h1 className="text-2xl font-semibold">
          {user.department} Admin Dashboard
        </h1>
        <p className="text-indigo-100 text-sm mt-1">
          Overview of {user.department} department performance
        </p>
      </div>

      {/* PURCHASE */}
      {user.department === "Purchase" && (
        <DashboardUI
          cards={[
            { title: "Total Purchase", value: data.totalPurchase },
            { title: "Pending PR", value: data.pendingPR },
            { title: "Employees", value: data.employees }
          ]}
          monthly={data.monthly}
          label="Total Purchase"
        />
      )}

      {/* SALES */}
      {user.department === "Sales" && (
        <DashboardUI
          cards={[
            { title: "Total Sales", value: data.totalSales },
            { title: "Orders", value: data.totalOrders },
            { title: "Employees", value: data.employees }
          ]}
          monthly={data.monthly}
          label="Total Sales"
        />
      )}

      {/* ACCOUNT */}
      {user.department === "Account" && (
        <DashboardUI
          cards={[
            { title: "Revenue", value: data.revenue },
            { title: "Pending Payments", value: data.pendingPayments },
            { title: "Employees", value: data.employees }
          ]}
          monthly={data.monthly}
          label="Revenue"
        />
      )}

      {/* MANUFACTURING */}
      {user.department === "Manufacturing" && (
        <DashboardUI
          cards={[
            { title: "Completed", value: data.totalProduction },
            { title: "Pending", value: data.pending },
            { title: "Employees", value: data.employees }
          ]}
          monthly={data.wireTypeStats}
          label="Production"
          isWireType
        />
      )}
      
    </div>
  );
}

/* ================= DASHBOARD UI ================= */

function DashboardUI({ cards, monthly = [], label, isWireType=false }) {

  const values = monthly.map(m =>
    Number(m.value ?? m.total ?? m.amount ?? m.qty ?? 0)
  );

  const labels = monthly.map(m =>
    isWireType ? m.wireType : m.month
  );

  const barData = {
    labels,
    datasets: [{
      label,
      data: values,
      backgroundColor: "#6366f1",
      borderRadius: 8,
      barThickness: 40
    }]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: v => v.toLocaleString() }
      }
    }
  };

  /* 🎨 CARD COLORS */
  const cardColors = [
    "from-indigo-500 to-indigo-600",
    "from-emerald-500 to-emerald-600",
    "from-orange-500 to-orange-600"
  ];

  return (
    <>
      {/* CARDS */}
      <div className="grid grid-cols-1  xl:grid-cols-3 gap-6 mb-8 w-full">

  {cards.map((c,i)=>(
    <div
      key={i}
      className={`text-white p-6 rounded-2xl shadow-lg bg-gradient-to-r ${cardColors[i]}
      transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
    >
      <p className="opacity-80 text-sm">{c.title}</p>
      <h2 className="text-3xl font-bold mt-2">
        {c.value?.toLocaleString?.() ?? 0}
      </h2>
    </div>
  ))}
</div>


      {/* CHART */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4 text-lg">
          {isWireType ? "Production by Wire Type" : `Monthly ${label}`}
        </h3>

       <div className="h-[350px] w-full min-w-0">


          <Bar data={barData} options={options} />
        </div>
      </div>
    </>
  );
}

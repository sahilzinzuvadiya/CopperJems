import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  LogOut,
  Bell,
  Mail,
  CheckCircle
} from "lucide-react";
import axios from "../api/axios";
import AdminList from "./AdminList";
import AddAdmin from "./AddAdmin";
import SuperAdminEmployee from "./SuperAdminEmployee";
import NotificationBell from "../components/NotificationBell";
import SuperApprove from "./superadmin/SuperApprove";
import { FaChartLine, FaMoneyBill, FaMoneyBillWave, FaReceipt, FaShoppingCart } from "react-icons/fa";
import AccountsPaymentHistory from "./accounts/AccountPaymentHistory";
import RawMaterial from "./Manufecturing/RawMaterial";
import ProductionShow from "./Manufecturing/ProductionShow";
import SalesHistory from "./sales/SalesHistory";
import AccountClients from "./sales/AccountClients";
import SuperDashboard from "./SuperDashboard";
import SuperAdminApprove from "./accounts/SuperAdminApprove";
import PendingPayments from "./superadmin/PendingPayments";
import PaymentsReceived from "./superadmin/PaymentReceived";
import SuperAdminFinance from "./superadmin/SuperAdminFinance";

export default function SuperAdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [profileOpen, setProfileOpen] = useState(false);

  // ✅ ADD THIS
  const user = {
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
    department: localStorage.getItem("department")
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };


  return (
    <div className="min-h-screen w-full bg-[#F4F7FB] overflow-x-hidden">


      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex fixed left-0 top-0 w-72 h-screen bg-gradient-to-b from-[#0B1220] to-[#111C33] text-white flex-col z-40">

        <Sidebar setPage={setPage} page={page} logout={logout} />

      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* SIDEBAR */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
          fixed top-0 left-0 z-50
          w-72 h-screen
          bg-gradient-to-b from-[#0B1220] to-[#111C33]
          text-white flex flex-col
        "
            >
              {/* ===== HEADER ===== */}
              <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
                    CJ
                  </div>
                  <h1 className="text-lg font-semibold">
                    Copper<span className="text-indigo-400">Jems</span>
                  </h1>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300 hover:text-white transition"
                >
                  <X size={22} />
                </button>
              </div>

              {/* ===== MENU ===== */}
              <div className="flex-1 overflow-y-auto">
                <Sidebar
                  setPage={(p) => {
                    setPage(p);
                    setMobileOpen(false);
                  }}
                  page={page}
                  logout={logout}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>


      {/* ================= MAIN ================= */}
      <div className="flex flex-col min-h-screen md:ml-72">


        {/* ================= TOPBAR ================= */}
        <header className="h-16 sm:h-20 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">

          <button onClick={() => setMobileOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>

          <h2 className="text-sm max-sm:hidden sm:text-lg font-semibold text-slate-700">
            Super Admin Dashboard
          </h2>

          {/* ===== PROFILE ===== */}
          <div className="relative flex items-center gap-4">

            <NotificationBell />

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 hover:bg-slate-100 px-3 py-2 rounded-lg transition"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold uppercase">
                {user.email?.charAt(0)}
              </div>


            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                  className="
      absolute right-0 top-14 w-64
      bg-white rounded-2xl
      shadow-[0_20px_45px_rgba(0,0,0,0.12)]
      z-50 overflow-hidden
    "
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between px-5 py-4 bg-slate-50">
                    <div>
                      <p className="text-sm flex items-center gap-2 font-semibold text-slate-800 truncate">
                        <Mail size={14} />
                        {user.email}
                      </p>
                      <p className="text-xs text-slate-500 capitalize mt-0.5">
                        {user.role}
                      </p>
                    </div>

                    {/* CLOSE BUTTON */}
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="text-slate-400 hover:text-slate-700 transition"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* BODY */}
                  <div className="px-5 py-4 space-y-2">

                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                      }}
                      className="
          w-full flex items-center gap-3 px-3 py-2.5
          rounded-xl text-sm font-medium
          text-red-600 hover:bg-red-50 transition
        "
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </header>


        {/* ================= CONTENT ================= */}
        <main className="flex-1 min-w-0 w-full overflow-y-auto overflow-x-hidden p-4 sm:p-6">


          {page === "dashboard" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="
          rounded-3xl p-5 sm:p-6 mb-5
          bg-gradient-to-r from-indigo-600 to-indigo-500
          shadow-md
        "
              >
                <h1 className="text-xl sm:text-2xl font-semibold text-white">
                  CopperJems SuperAdmin Panel
                </h1>

                <p className="text-indigo-100 text-sm mt-1">
                  Manage employees, admins and system activity from one place.
                </p>

                <div className="mt-4 h-[3px] w-16 bg-white/70 rounded-full" />
              </motion.div>

              <SuperDashboard />
            </>
          )}
          {page === "finance" && <SuperAdminFinance />}
          {page === "create-admin" && <AddAdmin />}
          {page === "admins" && <AdminList />}
          {page === "employees" && <SuperAdminEmployee />}
          {page === "purchase-requests" && <SuperApprove />}
          {page === "payment-history" && <AccountsPaymentHistory />}
          {page === "rawmaterials" && <RawMaterial />}
          {page === "completeproduction" && <ProductionShow />}
          {page === "sales-history" && <SalesHistory />}
          {page === "Client" && <AccountClients />}
          {page === "fundrequest" && <SuperAdminApprove />}
          {page === "pending" && <PendingPayments />}
          {page === "received" && <PaymentsReceived />}

        </main>

      </div>
    </div>
  );
}

/* ================= SIDEBAR ================= */

function Sidebar({ setPage, page, logout }) {
  const activeClass =
    "bg-indigo-600 text-white shadow";
  const normalClass =
    "text-slate-300 hover:bg-[#111C33]";

  const menuBtn = (key) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${page === key ? activeClass : normalClass
    }`;

  return (
    <div className="h-full flex flex-col">

      {/* BRAND */}
      <div className="flex items-center gap-3 px-6 py-6 max-sm:hidden">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">CJ</span>
        </div>
        <h1 className="text-xl font-semibold">
          <span className="text-white">Copper</span>
          <span className="text-indigo-400">Jems</span>
        </h1>
      </div>

      {/* MENU */}
      <div
        className="
    flex-1
    px-4
    space-y-1
    text-sm
    overflow-y-auto
    scrollbar-hide
  "
      >

        {/* DASHBOARD */}
        <p className="px-4 mt-2 mb-2 text-xs tracking-widest text-slate-400">
          DASHBOARD
        </p>
        <button
          onClick={() => setPage("dashboard")}
          className={menuBtn("dashboard")}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

         <button
          onClick={() => setPage("finance")}
          className={menuBtn("finance")}
        >
          <FaChartLine size={18} />
          Finance
        </button>

        {/* ADMIN */}
        <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
          ADMIN MANAGEMENT
        </p>

        <button
          onClick={() => setPage("create-admin")}
          className={menuBtn("create-admin")}
        >
          <UserPlus size={18} />
          Create Admin
        </button>

        <button
          onClick={() => setPage("admins")}
          className={menuBtn("admins")}
        >
          <Users size={18} />
          Admins
        </button>

        {/* EMPLOYEES */}
        <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
          EMPLOYEE MANAGEMENT
        </p>

        <button
          onClick={() => setPage("employees")}
          className={menuBtn("employees")}
        >
          <Users size={18} />
          Employees
        </button>

        {/* PURCHASE */}
        <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
          PURCHASE
        </p>

        <button
          onClick={() => setPage("purchase-requests")}
          className={menuBtn("purchase-requests")}
        >
          <FileText size={18} />
          PurchaseOrder Requests
        </button>

        {/* FINANCE / AUDIT */}
        <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
          FINANCE / AUDIT
        </p>

        <button
          onClick={() => setPage("fundrequest")}
          className={menuBtn("fundrequest")}
        >
          <FaMoneyBillWave size={18} />
          FundRequest
        </button>

        <button
          onClick={() => setPage("payment-history")}
          className={menuBtn("payment-history")}
        >
          <FaReceipt size={18} />
          Payment History
        </button>



        <Section title="MANUFACTURING" />
        <button
          onClick={() => setPage("rawmaterials")}
          className={menuBtn("rawmaterials")}
        >
          🏭 Raw Materials Status
        </button>
        <button
          onClick={() => setPage("completeproduction")}
          className={menuBtn("completeproduction")}
        >

          <CheckCircle size={18} />
          Complete Production
        </button>

        {/* SALES */}
        <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
          SALES
        </p>

        <button
          onClick={() => setPage("sales-history")}
          className={menuBtn("sales-history")}
        >
          <FaShoppingCart size={18} />
          Sales History
        </button>

        {/* CLIENTS */}
        <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
          CLIENTS
        </p>

        <button
          onClick={() => setPage("Client")}
          className={menuBtn("Client")}
        >
          <Users size={18} />
          Clients
        </button>

        <button
          onClick={() => setPage("pending")}
          className={menuBtn("pending")}
        >
          <Users size={18} />
          PendingClientPayments
        </button>

        <button
          onClick={() => setPage("received")}
          className={menuBtn("received")}
        >
          <Users size={18} />
          PaymentReceived
        </button>

      </div>

      {/* LOGOUT */}
      <div className="p-4 mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}


/* ================= CREATE ADMIN FORM ================= */

function CreateAdminForm() {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const submit = async () => {
    const res = await axios.post(
      "/admin/create",
      { email, department },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    alert(
      `Admin Created\n\nEmail: ${res.data.email}\nPassword: ${res.data.password}`
    );

    setEmail("");
    setDepartment("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 max-w-xl"
    >
      <h2 className="text-xl font-bold mb-4">Create Admin</h2>

      <input
        className="w-full border p-3 rounded mb-4"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="w-full border p-3 rounded mb-6"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">Select Department</option>
        <option>Manufacturing</option>
        <option>Sales</option>
        <option>Purchase</option>
        <option>Account</option>
      </select>

      <button
        onClick={submit}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
      >
        Create Admin
      </button>
    </motion.div>
  );
}

/* ================= UI ================= */

function MenuItem({ icon: Icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-[#111C33] transition"
    >
      <Icon size={18} />
      {text}
    </button>
  );
}

function Section({ title }) {
  return (
    <p className="text-xs text-slate-400 mt-6 mb-2 px-3 tracking-widest">
      {title}
    </p>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

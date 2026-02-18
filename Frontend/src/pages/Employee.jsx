import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Menu,
  LogOut,
  Bell,
  Lock,
  X,
  Mail,
  Factory,
  ShoppingCart,
  UserPlus,
  UserPlus2,
  User,
  Users
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import { toast } from "react-toastify";
import NotificationBell from "../components/NotificationBell";
import PurchaseRequest from "./employee/PurchaseRequest";
import EmployeeProduction from "./Manufecturing/EmployeeProduction";
import SalesEmployee from "./sales/SalesEmployee";
import AccountClients from "./sales/AccountClients";
import EmployeeDashboard from "./EmployeeDashboard";
import EmployeePurchaseRequest from "./EmployeePurchaseRequest";

/* ======================= MAIN ======================= */

export default function Employee() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;
    if (!token) return;
    setUser(jwtDecode(token));
  }, []);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  /* ================= CHANGE PASSWORD ================= */
  const changePassword = async () => {
    if (!oldPass || !newPass) {
      toast.warning("Fill all fields");
      return;
    }

    try {
      await axios.post(
        "/employee/change-password",
        { oldPassword: oldPass, newPassword: newPass },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      toast.success("Password updated");
      setChangePassOpen(false);
      setOldPass("");
      setNewPass("");
    } catch {
      toast.error("Old password incorrect");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-[#F4F7FB] overflow-x-hidden">

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="hidden md:flex fixed left-0 top-0 w-72 h-screen bg-[#0B1220] text-white flex-col z-40">

        <Sidebar setPage={setPage} page={page} logout={logout} department={user?.department} />
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex flex-col min-h-screen md:ml-72 flex-1 min-w-0">

        {/* ================= TOPBAR ================= */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <button onClick={() => setMobileOpen(true)} className="md:hidden">
            <Menu />
          </button>

          <div className="max-sm:hidden">
            <h2 className="font-semibold text-slate-700">
              {user.department} Department
            </h2>
            <p className="text-xs text-slate-400">Employee Panel</p>
          </div>

          {/* PROFILE */}
          <div className="relative flex items-center gap-4">
            <NotificationBell />

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold uppercase"
            >
              {localStorage.getItem("email")?.charAt(0)}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl z-50"
                >
                  <div className="px-5 py-4 bg-slate-50 flex justify-between">
                    <div>
                      <p className="font-semibold text-sm flex items-center gap-2">
                        <Mail size={14} />
                        {localStorage.getItem("email")}
                      </p>
                      <p className="text-xs text-slate-500">Employee</p>
                    </div>

                    <button onClick={() => setProfileOpen(false)}>
                      <X size={18} />
                    </button>
                  </div>

                  <div className="px-4 py-3 space-y-2">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setChangePassOpen(true);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-50"
                    >
                      <Lock size={18} />
                      Change Password
                    </button>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50"
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
      <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6">

          {page === "dashboard" && (
            <>
            
            <EmployeeDashboard />
            </>
          )}
           {page === "create-request" && <PurchaseRequest />}

            {page === "employee-production" && <EmployeeProduction />}

            {page === "Product-sale" && <SalesEmployee />}

            {page === "Client" && <AccountClients />}

            {page === "my-requests" && <EmployeePurchaseRequest />}

            
        </main>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
  {mobileOpen && (
    <>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setMobileOpen(false)}
      />

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed top-0 left-0 w-72 h-full bg-[#0B1220] text-white z-50 flex flex-col"
      >

        {/* 🔴 HEADER WITH CLOSE */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold">
              CJ
            </div>
            <h2 className="font-semibold text-lg">
              Copper<span className="text-indigo-400">Jems</span>
            </h2>
          </div>

          {/* ❌ CLOSE BUTTON */}
          <button
            onClick={() => setMobileOpen(false)}
            className="text-slate-300 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* MENU */}
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


      {/* ================= CHANGE PASSWORD MODAL ================= */}
      <AnimatePresence>
        {changePassOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setChangePassOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="fixed inset-0 flex items-center justify-center px-4 z-50"
            >
              <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl relative">
                <button
                  onClick={() => setChangePassOpen(false)}
                  className="absolute top-4 right-4"
                >
                  <X />
                </button>

                <div className="text-center mb-6">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4">
                    <Lock className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold">Change Password</h2>
                </div>

                <InputField
                  icon={<Lock size={18} />}
                  placeholder="Current Password"
                  value={oldPass}
                  onChange={setOldPass}
                  type="password"
                />

                <InputField
                  icon={<Lock size={18} />}
                  placeholder="New Password"
                  value={newPass}
                  onChange={setNewPass}
                  type="password"
                />

                <button
                  onClick={changePassword}
                  className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      

    </div>
  );
}

/* ======================= COMPONENTS ======================= */
function Sidebar({ setPage, page, logout, department }) {

  const isActive = (p) =>
    page === p
      ? "bg-indigo-600 text-white"
      : "text-slate-300 hover:bg-[#111C33]";

  const isPurchase = department === "Purchase";
  const isManufacture = department === "Manufacturing";
  const isSales = department === "Sales";   // ⭐ NEW

  return (
    <div className="h-full flex flex-col">

      {/* BRAND */}
      <div className="px-6 py-6 flex items-center gap-3 hidden md:flex">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
          <span className="text-white font-bold">CJ</span>
        </div>
        <h1 className="text-xl font-semibold">
          Copper<span className="text-indigo-400">Jems</span>
        </h1>
      </div>

      {/* MENU */}
      <div className="px-4 text-sm space-y-1">

        <button
          onClick={() => setPage("dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("dashboard")}`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>
{/* 
        <button
          onClick={() => setPage("notifications")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("notifications")}`}
        >
          <Bell size={18} />
          Notifications
        </button> */}

        {/* PURCHASE */}
        {isPurchase && (
          <>
            <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
              PURCHASE
            </p>

            <button
              onClick={() => setPage("create-request")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("create-request")}`}
            >
              <Mail size={18} />
              Create Request
            </button>

            <button
              onClick={() => setPage("my-requests")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("my-requests")}`}
            >
              <Lock size={18} />
              My Requests
            </button>
          </>
        )}

        {/* ⭐ MANUFACTURING EMPLOYEE MENU */}
        {isManufacture && (
          <>
            <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
              MANUFACTURING
            </p>

            <button
              onClick={() => setPage("employee-production")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("employee-production")}`}
            >
              <Factory size={18} />
              Production Tasks
            </button>
          </>
        )}
        {isSales && (
          <>
            <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
              SALES
            </p>

            <button
              onClick={() => setPage("Product-sale")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("Product-sale")}`}
            >
              <ShoppingCart size={18} />
              Sell Product
            </button>

             <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
              CLIENT
            </p>

              <button
              onClick={() => setPage("Client")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("Client")}`}
            >
              <Users size={18} />
              Clients
            </button>
          </>
        )}

      </div>

      {/* LOGOUT */}
      <div className="mt-auto p-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
function InfoCard({ title, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-5">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="font-semibold text-slate-700">{value}</p>
    </div>
  );
}

function MenuItem({ icon: Icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-[#111C33]"
    >
      <Icon size={18} />
      {text}
    </button>
  );
}

function InputField({ icon, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl mb-4">
      <span className="text-slate-400">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent w-full outline-none"
      />
    </div>
  );
}

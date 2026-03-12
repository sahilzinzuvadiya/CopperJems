// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LayoutDashboard,
//   Menu,
//   LogOut,
//   Bell,
//   Lock,
//   X,
//   Mail,
//   Factory,
//   ShoppingCart,
//   UserPlus,
//   UserPlus2,
//   User,
//   Users
// } from "lucide-react";
// import { jwtDecode } from "jwt-decode";
// import axios from "../api/axios";
// import { toast } from "react-toastify";
// import NotificationBell from "../components/NotificationBell";
// import PurchaseRequest from "./employee/PurchaseRequest";
// import EmployeeProduction from "./Manufecturing/EmployeeProduction";
// import SalesEmployee from "./sales/SalesEmployee";
// import AccountClients from "./sales/AccountClients";
// import EmployeeDashboard from "./EmployeeDashboard";
// import EmployeePurchaseRequest from "./EmployeePurchaseRequest";

// /* ======================= MAIN ======================= */

// export default function Employee() {
//   const [page, setPage] = useState("dashboard");
//   const [user, setUser] = useState(null);

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [changePassOpen, setChangePassOpen] = useState(false);

//   const [oldPass, setOldPass] = useState("");
//   const [newPass, setNewPass] = useState("");

//   /* ================= AUTH ================= */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = token ? jwtDecode(token) : null;
//     if (!token) return;
//     setUser(jwtDecode(token));
//   }, []);

//   /* ================= LOGOUT ================= */
//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   /* ================= CHANGE PASSWORD ================= */
//   const changePassword = async () => {
//     if (!oldPass || !newPass) {
//       toast.warning("Fill all fields");
//       return;
//     }

//     try {
//       await axios.post(
//         "/employee/change-password",
//         { oldPassword: oldPass, newPassword: newPass },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       toast.success("Password updated");
//       setChangePassOpen(false);
//       setOldPass("");
//       setNewPass("");
//     } catch {
//       toast.error("Old password incorrect");
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen w-full bg-[#F4F7FB] overflow-x-hidden">

//       {/* ================= SIDEBAR (DESKTOP) ================= */}
//       <aside className="hidden md:flex fixed left-0 top-0 w-72 h-screen bg-[#0B1220] text-white flex-col z-40">

//         <Sidebar setPage={setPage} page={page} logout={logout} department={user?.department} />
//       </aside>

//       {/* ================= MAIN ================= */}
//       <div className="flex flex-col min-h-screen md:ml-72 flex-1 min-w-0">

//         {/* ================= TOPBAR ================= */}
//         <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
//           <button onClick={() => setMobileOpen(true)} className="md:hidden">
//             <Menu />
//           </button>

//           <div className="max-sm:hidden">
//             <h2 className="font-semibold text-slate-700">
//               {user.department} Department
//             </h2>
//             <p className="text-xs text-slate-400">Employee Panel</p>
//           </div>

//           {/* PROFILE */}
//           <div className="relative flex items-center gap-4">
//             <NotificationBell />

//             <button
//               onClick={() => setProfileOpen(!profileOpen)}
//               className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold uppercase"
//             >
//               {localStorage.getItem("email")?.charAt(0)}
//             </button>

//             <AnimatePresence>
//               {profileOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl z-50"
//                 >
//                   <div className="px-5 py-4 bg-slate-50 flex justify-between">
//                     <div>
//                       <p className="font-semibold text-sm flex items-center gap-2">
//                         <Mail size={14} />
//                         {localStorage.getItem("email")}
//                       </p>
//                       <p className="text-xs text-slate-500">Employee</p>
//                     </div>

//                     <button onClick={() => setProfileOpen(false)}>
//                       <X size={18} />
//                     </button>
//                   </div>

//                   <div className="px-4 py-3 space-y-2">
//                     <button
//                       onClick={() => {
//                         setProfileOpen(false);
//                         setChangePassOpen(true);
//                       }}
//                       className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-50"
//                     >
//                       <Lock size={18} />
//                       Change Password
//                     </button>

//                     <button
//                       onClick={logout}
//                       className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50"
//                     >
//                       <LogOut size={18} />
//                       Logout
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </header>

//         {/* ================= CONTENT ================= */}
//         <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6">

//           {page === "dashboard" && (
//             <>

//               <EmployeeDashboard />
//             </>
//           )}
//           {page === "create-request" && <PurchaseRequest />}

//           {page === "employee-production" && <EmployeeProduction />}

//           {page === "Product-sale" && <SalesEmployee />}

//           {page === "Client" && <AccountClients />}

//           {page === "my-requests" && <EmployeePurchaseRequest />}


//         </main>
//       </div>

//       {/* ================= MOBILE SIDEBAR ================= */}

//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             {/* BACKDROP */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-40"
//               onClick={() => setMobileOpen(false)}
//             />

//             {/* SIDEBAR */}
//             <motion.aside
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", stiffness: 260, damping: 30 }}
//               className="fixed top-0 left-0 w-72 max-w-[85vw] h-screen bg-[#0B1220] text-white z-50 flex flex-col"
//             >
//               {/* HEADER */}
//               <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold">
//                     CJ
//                   </div>
//                   <h2 className="font-semibold text-lg">
//                     Copper<span className="text-indigo-400">Jems</span>
//                   </h2>
//                 </div>

//                 <button
//                   onClick={() => setMobileOpen(false)}
//                   className="text-slate-300"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* MENU SCROLL */}
//               <div className="flex-1 overflow-y-auto px-2 py-2">
//                 <Sidebar
//                   setPage={(p) => {
//                     setPage(p);
//                     setMobileOpen(false);
//                   }}
//                   page={page}
//                   logout={logout}
//                   department={user?.department}
//                 />
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>



//       {/* ================= CHANGE PASSWORD MODAL ================= */}
//       <AnimatePresence>
//         {changePassOpen && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//               onClick={() => setChangePassOpen(false)}
//             />

//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="fixed inset-0 flex items-center justify-center px-4 z-50"
//             >
//               <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl relative">
//                 <button
//                   onClick={() => setChangePassOpen(false)}
//                   className="absolute top-4 right-4"
//                 >
//                   <X />
//                 </button>

//                 <div className="text-center mb-6">
//                   <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4">
//                     <Lock className="text-white" />
//                   </div>
//                   <h2 className="text-xl font-bold">Change Password</h2>
//                 </div>

//                 <InputField
//                   icon={<Lock size={18} />}
//                   placeholder="Current Password"
//                   value={oldPass}
//                   onChange={setOldPass}
//                   type="password"
//                 />

//                 <InputField
//                   icon={<Lock size={18} />}
//                   placeholder="New Password"
//                   value={newPass}
//                   onChange={setNewPass}
//                   type="password"
//                 />

//                 <button
//                   onClick={changePassword}
//                   className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
//                 >
//                   Update Password
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>



//     </div>
//   );
// }

// /* ======================= COMPONENTS ======================= */
// function Sidebar({ setPage, page, logout, department }) {

//   const isActive = (p) =>
//     page === p
//       ? "bg-indigo-600 text-white"
//       : "text-slate-300 hover:bg-[#111C33]";

//   const isPurchase = department === "Purchase";
//   const isManufacture = department === "Manufacturing";
//   const isSales = department === "Sales";   // ⭐ NEW

//   return (
//     <div className="h-full flex flex-col">

//       {/* BRAND */}

//       <div className="hidden md:flex px-6 py-6 items-center gap-3">
//         <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
//           <span className="text-white font-bold">CJ</span>
//         </div>
//         <h1 className="text-xl font-semibold">
//           Copper<span className="text-indigo-400">Jems</span>
//         </h1>
//       </div>


//       {/* MENU */}
//       <div className="px-4 text-sm space-y-1">

//         <button
//           onClick={() => setPage("dashboard")}
//           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("dashboard")}`}
//         >
//           <LayoutDashboard size={18} />
//           Dashboard
//         </button>
//         {/* 
//         <button
//           onClick={() => setPage("notifications")}
//           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("notifications")}`}
//         >
//           <Bell size={18} />
//           Notifications
//         </button> */}

//         {/* PURCHASE */}
//         {isPurchase && (
//           <>
//             <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
//               PURCHASE
//             </p>

//             <button
//               onClick={() => setPage("create-request")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("create-request")}`}
//             >
//               <Mail size={18} />
//               Create Request
//             </button>

//             <button
//               onClick={() => setPage("my-requests")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("my-requests")}`}
//             >
//               <Lock size={18} />
//               My Requests
//             </button>
//           </>
//         )}

//         {/* ⭐ MANUFACTURING EMPLOYEE MENU */}
//         {isManufacture && (
//           <>
//             <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
//               MANUFACTURING
//             </p>

//             <button
//               onClick={() => setPage("employee-production")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("employee-production")}`}
//             >
//               <Factory size={18} />
//               Production Tasks
//             </button>
//           </>
//         )}
//         {isSales && (
//           <>
//             <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
//               SALES
//             </p>

//             <button
//               onClick={() => setPage("Product-sale")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("Product-sale")}`}
//             >
//               <ShoppingCart size={18} />
//               Sell Product
//             </button>

//             <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">
//               CLIENT
//             </p>

//             <button
//               onClick={() => setPage("Client")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive("Client")}`}
//             >
//               <Users size={18} />
//               Clients
//             </button>
//           </>
//         )}

//       </div>

//       {/* LOGOUT */}
//       <div className="mt-auto p-4">
//         <button
//           onClick={logout}
//           className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
// function InfoCard({ title, value }) {
//   return (
//     <div className="bg-slate-50 rounded-xl p-5">
//       <p className="text-xs text-slate-400">{title}</p>
//       <p className="font-semibold text-slate-700">{value}</p>
//     </div>
//   );
// }

// function MenuItem({ icon: Icon, text, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-[#111C33]"
//     >
//       <Icon size={18} />
//       {text}
//     </button>
//   );
// }

// function InputField({ icon, placeholder, value, onChange, type = "text" }) {
//   return (
//     <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl mb-4">
//       <span className="text-slate-400">{icon}</span>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="bg-transparent w-full outline-none"
//       />
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Menu,
  LogOut,
  Lock,
  X,
  Mail,
  Factory,
  ShoppingCart,
  Users,
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

/* ── Theme tokens (identical to AdminDashboard) ── */
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function Employee() {
  const [page,           setPage]           = useState("dashboard");
  const [user,           setUser]           = useState(null);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [profileOpen,    setProfileOpen]    = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [oldPass,        setOldPass]        = useState("");
  const [newPass,        setNewPass]        = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setUser(jwtDecode(token));
  }, []);

  const logout = () => { localStorage.clear(); window.location.href = "/"; };

  const changePassword = async () => {
    if (!oldPass || !newPass) { toast.warning("Fill all fields"); return; }
    try {
      await axios.post(
        "/employee/change-password",
        { oldPassword: oldPass, newPassword: newPass },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      toast.success("Password updated");
      setChangePassOpen(false); setOldPass(""); setNewPass("");
    } catch {
      toast.error("Old password incorrect");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: "#0c0c14" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden md:flex fixed left-0 top-0 w-72 h-screen flex-col z-40"
        style={{ background: "rgba(14,12,30,0.98)", borderRight: `1px solid ${BORDER}` }}
      >
        <Sidebar setPage={setPage} page={page} logout={logout} department={user?.department} />
      </aside>

      {/* ── MOBILE SIDEBAR ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed top-0 left-0 w-72 h-full z-50 flex flex-col"
              style={{ background: "rgba(14,12,30,0.98)", borderRight: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                      boxShadow: `0 0 16px rgba(99,102,241,0.4)`,
                    }}
                  >
                    CJ
                  </div>
                  <h2 className="font-semibold text-lg" style={{ color: TEXT1 }}>
                    Copper<span style={{ color: VIOLET }}>Jems</span>
                  </h2>
                </div>
                <button onClick={() => setMobileOpen(false)} style={{ color: TEXT2 }}>
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <Sidebar
                  setPage={(p) => { setPage(p); setMobileOpen(false); }}
                  page={page} logout={logout} department={user?.department}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN AREA ── */}
      <div className="flex flex-col min-h-screen md:ml-72 flex-1 min-w-0">

        {/* ── TOPBAR ── */}
        <header
          className="h-16 flex items-center justify-between px-6 sticky top-0 z-30"
          style={{
            background: "rgba(16,14,35,0.98)",
            borderBottom: `1px solid ${BORDER}`,
            backdropFilter: "blur(12px)",
          }}
        >
          <button onClick={() => setMobileOpen(true)} className="md:hidden" style={{ color: TEXT1 }}>
            <Menu />
          </button>

          <div className="max-sm:hidden">
            <h2 className="font-semibold text-sm" style={{ color: TEXT1 }}>
              {user.department} Department
            </h2>
            <p className="text-xs" style={{ color: TEXT2 }}>Employee Panel</p>
          </div>

          {/* Right side */}
          <div className="relative flex items-center gap-3">
            <NotificationBell />

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-xl flex items-center justify-center font-semibold uppercase text-sm transition"
              style={{
                background: "rgba(99,102,241,0.15)",
                border: `1px solid rgba(99,102,241,0.3)`,
                color: VIOLET,
              }}
            >
              {localStorage.getItem("email")?.charAt(0)}
            </button>

            {/* Profile dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-14 w-64 rounded-2xl z-50 overflow-hidden"
                  style={{
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "0 20px 48px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(99,102,241,0.07)" }}>
                    <div>
                      <p className="font-semibold text-sm flex items-center gap-2" style={{ color: TEXT1 }}>
                        <Mail size={14} style={{ color: VIOLET }} />
                        {localStorage.getItem("email")}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>Employee</p>
                    </div>
                    <button onClick={() => setProfileOpen(false)} style={{ color: TEXT2 }}>
                      <X size={18} />
                    </button>
                  </div>

                  <div className="px-4 py-3 space-y-1">
                    <button
                      onClick={() => { setProfileOpen(false); setChangePassOpen(true); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition"
                      style={{ color: TEXT1 }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <Lock size={17} style={{ color: VIOLET }} /> Change Password
                    </button>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition"
                      style={{ color: "#f87171" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <LogOut size={17} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main
          className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.1) 0%, transparent 60%),
              #0c0c14
            `,
          }}
        >
          {page === "dashboard"           && <EmployeeDashboard />}
          {page === "create-request"      && <PurchaseRequest />}
          {page === "employee-production" && <EmployeeProduction />}
          {page === "Product-sale"        && <SalesEmployee />}
          {page === "Client"              && <AccountClients />}
          {page === "my-requests"         && <EmployeePurchaseRequest />}
        </main>
      </div>

      {/* ── CHANGE PASSWORD MODAL ── */}
      <AnimatePresence>
        {changePassOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
              onClick={() => setChangePassOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center px-4 z-50"
            >
              <div className="max-w-md w-full rounded-3xl p-8 relative"
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 32px 64px rgba(0,0,0,0.7)",
                }}
              >
                {/* Top glow line */}
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: "160px", height: "1px",
                  background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
                }} />

                <button onClick={() => setChangePassOpen(false)} className="absolute top-4 right-4" style={{ color: TEXT2 }}>
                  <X />
                </button>

                <div className="text-center mb-6">
                  <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                      boxShadow: `0 0 24px rgba(99,102,241,0.4)`,
                    }}
                  >
                    <Lock className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: TEXT1 }}>Change Password</h2>
                  <p className="text-sm mt-1" style={{ color: TEXT2 }}>Keep your account secure</p>
                </div>

                <div className="space-y-4">
                  <DarkInput icon={<Lock size={18} />} placeholder="Current Password" value={oldPass} onChange={setOldPass} type="password" />
                  <DarkInput icon={<Lock size={18} />} placeholder="New Password"     value={newPass} onChange={setNewPass} type="password" />
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }} onClick={changePassword}
                  className="w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                    boxShadow: `0 4px 16px rgba(99,102,241,0.35)`,
                    border: "none", cursor: "pointer",
                  }}
                >
                  Update Password
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── SIDEBAR ── */
function Sidebar({ setPage, page, logout, department }) {
  const isPurchase    = department === "Purchase";
  const isManufacture = department === "Manufacturing";
  const isSales       = department === "Sales";

  const Btn = ({ id, icon: Icon, label }) => {
    const isActive = page === id;
    return (
      <button
        onClick={() => setPage(id)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium"
        style={{
          background: isActive
            ? "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.2))"
            : "transparent",
          border:    isActive ? `1px solid rgba(99,102,241,0.4)` : "1px solid transparent",
          color:     isActive ? TEXT1 : TEXT2,
          boxShadow: isActive ? "0 2px 12px rgba(99,102,241,0.2)" : "none",
          cursor: "pointer",
        }}
        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(99,102,241,0.08)"; e.currentTarget.style.color = "#c4b5fd"; }}}
        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TEXT2; }}}
      >
        <Icon size={17} /> {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full">

      {/* Brand */}
      <div className="h-16 px-6 hidden md:flex items-center gap-3"
        style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.45)`,
          }}
        >
          CJ
        </div>
        <div className="text-lg font-semibold" style={{ color: TEXT1 }}>
          Copper<span style={{ color: VIOLET }}>Jems</span>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1" style={{ scrollbarWidth: "none" }}>

        <Section title="DASHBOARD" />
        <Btn id="dashboard" icon={LayoutDashboard} label="Dashboard" />

        {isPurchase && (
          <>
            <Section title="PURCHASE" />
            <Btn id="create-request" icon={Mail}  label="Create Request" />
            <Btn id="my-requests"    icon={Lock}  label="My Requests" />
          </>
        )}

        {isManufacture && (
          <>
            <Section title="MANUFACTURING" />
            <Btn id="employee-production" icon={Factory} label="Production Tasks" />
          </>
        )}

        {isSales && (
          <>
            <Section title="SALES" />
            <Btn id="Product-sale" icon={ShoppingCart} label="Sell Product" />
            <Section title="CLIENT" />
            <Btn id="Client"       icon={Users}        label="Clients" />
          </>
        )}
      </div>

      {/* Logout */}
      <div className="p-4" style={{ borderTop: `1px solid ${BORDER}` }}>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition"
          style={{
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "#f87171",
            cursor: "pointer",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.22)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

/* ── SHARED COMPONENTS ── */
function Section({ title }) {
  return (
    <p className="text-xs px-4 mt-5 mb-2 tracking-widest font-semibold"
      style={{ color: "rgba(99,102,241,0.55)" }}>
      {title}
    </p>
  );
}

function DarkInput({ icon, placeholder, value, onChange, type = "text" }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl w-full"
      style={{ background: "rgba(99,102,241,0.06)", border: `1px solid ${BORDER}`, transition: "all 0.2s" }}
      onFocus={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.6)"; e.currentTarget.style.background = "rgba(99,102,241,0.1)"; }}
      onBlur={e  => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = "rgba(99,102,241,0.06)"; }}
    >
      <span style={{ color: TEXT2 }}>{icon}</span>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent w-full outline-none text-sm"
        style={{ color: TEXT1, caretColor: VIOLET }}
      />
    </div>
  );
}
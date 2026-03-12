// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LayoutDashboard,
//   Users,
//   UserPlus,
//   Trash2,
//   X,
//   Mail,
//   User,
//   Menu,
//   LogOut,
//   Bell,
//   Lock,
//   Building2,
//   Copy,
//   Pencil,
//   FileText,
//   CheckCircle,
//   Wallet,
//   FileClock,
//   FilePlus
// } from "lucide-react";
// import { jwtDecode } from "jwt-decode";
// import axios from "../api/axios";
// import { toast } from "react-toastify";
// import NotificationBell from "../components/NotificationBell";
// import AdminApprovals from "./admin/AdminApprovals";
// import AccountsPayment from "./accounts/AccountPayment";
// import { FaBell, FaBoxes, FaFileInvoice, FaPlusCircle, FaReceipt, FaShoppingCart, FaUserPlus, FaWallet, FaWhatsapp } from "react-icons/fa";
// import AccountsPaymentHistory from "./accounts/AccountPaymentHistory";
// import GRNReceive from "./Manufecturing/GRNReceive";
// import RawMaterial from "./Manufecturing/RawMaterial";
// import ManufectureCreate from "./Manufecturing/ManufectureCreate";
// import ProductionShow from "./Manufecturing/ProductionShow";
// import SalesAdmin from "./sales/SalesAdmin";
// import SalesHistory from "./sales/SalesHistory";
// import AccountsCreateClient from "./accounts/AccountCreateClient";
// import AccountsCreateInvoice from "./accounts/AccountCreateInvoice";
// import AccountsPending from "./accounts/AccountPending";
// import AccountClients from "./sales/AccountClients";
// import PurchaseRequest from "./employee/PurchaseRequest";
// import Admin from "./Admin";
// import PaymentReminder from "./accounts/PaymentReminder";
// import AccountsSalesList from "./accounts/AccountsSalesList";
// import CreateVendor from "./Purchase/CreateVendor";
// import VendorList from "./Purchase/VendorList";
// import CreatePo from "./Purchase/CreatePo";
// import PoReadyList from "./Purchase/POReadyList";
// import SendVendorMessage from "./accounts/SendVendorMessage";

// /* ======================= MAIN ======================= */

// export default function AdminDashboard() {
//   const [page, setPage] = useState("dashboard");
//   const [employees, setEmployees] = useState([]);
//   const [createdEmployee, setCreatedEmployee] = useState(null);
//   const [editEmployee, setEditEmployee] = useState(null);
//   const [user, setUser] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [changePassOpen, setChangePassOpen] = useState(false);
//   const [walletOpen, setWalletOpen] = useState(false);
//   const [wallet, setWallet] = useState(0);
//   const [oldPass, setOldPass] = useState("");
//   const [newPass, setNewPass] = useState("");
//   const [saleData, setSaleData] = useState(null);
//   const [selectedPR, setSelectedPR] = useState(null);


//   useEffect(() => {
//     if (user?.department === "Account") {
//       axios.get("/account/wallet").then(res => {
//         setWallet(res.data.walletBalance || 0);
//       });
//     }
//   }, [user]);

//   /* ================= AUTH ================= */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     setUser(jwtDecode(token));
//   }, []);

//   /* ================= FETCH EMPLOYEES ================= */
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await axios.get("/employee/all", {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         });
//         setEmployees(res.data);
//       } catch {
//         toast.error("Failed to load employees");
//       }
//     };
//     fetchEmployees();
//   }, []);

//   /* ================= LOGOUT ================= */
//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const updateEmployee = async () => {
//     try {
//       await axios.put(
//         `/employee/update/${editEmployee._id}`,
//         editEmployee,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       setEmployees((prev) =>
//         prev.map((e) =>
//           e._id === editEmployee._id ? editEmployee : e
//         )
//       );

//       toast.success("Employee updated");
//       setEditEmployee(null);
//     } catch {
//       toast.error("Failed to update employee");
//     }
//   };

//   /* ================= CHANGE PASSWORD ================= */
//   const changePassword = async () => {
//     if (!oldPass || !newPass) {
//       toast.warning("Fill all fields");
//       return;
//     }

//     try {
//       await axios.post(
//         "/admin/change-password",
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

//   /* ================= CREATE EMPLOYEE ================= */
//   const createEmployee = async ({ name, email }) => {
//     try {
//       const res = await axios.post(
//         "/employee/create",
//         { name, email },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token")
//           }
//         }
//       );

//       const { employee, password } = res.data;

//       setEmployees(prev => [...prev, employee]);
//       setCreatedEmployee({
//         name: employee.name,
//         email: employee.email,
//         department: employee.department,
//         password
//       });

//       toast.success("Employee created");
//     } catch {
//       toast.error("Failed to create employee");
//     }
//   };

//   /* ================= DELETE EMPLOYEE ================= */
//   const deleteEmployee = async (id) => {
//     try {
//       await axios.delete(`/employee/delete/${id}`, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token")
//         }
//       });

//       setEmployees(prev => prev.filter(e => e._id !== id));
//       toast.success("Employee deleted");
//     } catch {
//       toast.error("Failed to delete employee");
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen w-full bg-[#F4F7FB] overflow-x-hidden">


//       {/* ================= SIDEBAR ================= */}
//       <aside className="hidden md:flex fixed left-0 top-0 w-72 h-screen bg-[#0B1220] text-white flex-col z-40">

//         {/* <div className="px-6 py-6 flex items-center gap-3">
//           <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
//             <span className="text-white font-bold">CJ</span>
//           </div>
//           <h1 className="text-xl font-semibold">
//             Copper<span className="text-indigo-400">Jems</span>
//           </h1>
//         </div> */}

//         <Sidebar setPage={setPage} page={page} logout={logout} department={user.department} />

//       </aside>
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
//               className="fixed top-0 left-0 w-72 h-full bg-[#0B1220] text-white z-50 flex flex-col"
//             >
//               {/* HEADER WITH CLOSE */}
//               <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
//                     <span className="text-white font-bold">CJ</span>
//                   </div>
//                   <h2 className="font-semibold text-lg">
//                     Copper<span className="text-indigo-400">Jems</span>
//                   </h2>
//                 </div>

//                 <button
//                   onClick={() => setMobileOpen(false)}
//                   className="text-slate-300 hover:text-white"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>

//               {/* MENU */}
//               <div className="flex-1 overflow-y-auto">
//                 <Sidebar
//                   setPage={(p) => {
//                     setPage(p);
//                     setMobileOpen(false);
//                   }}
//                   page={page}
//                   department={user.department}
//                   logout={logout}
//                 />
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>



//       {/* ================= MAIN ================= */}
//       <div className="flex flex-col min-h-screen md:ml-72 flex-1 min-w-0">

//         {/* ================= TOPBAR ================= */}
//         <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
//           <button onClick={() => setMobileOpen(true)} className="md:hidden">
//             <Menu />
//           </button>

//           <h2 className="text-sm max-sm:hidden font-semibold text-slate-700">
//             {user.department} Admin Dashboard
//           </h2>

//           {/* RIGHT SIDE */}
//           <div className="relative flex items-center gap-4">

//             {/* 💰 WALLET ONLY ACCOUNT ADMIN */}
//             {user.department === "Account" && (
//               <>
//                 <button
//                   onClick={() => setWalletOpen(!walletOpen)}
//                   className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:scale-105 transition"
//                 >
//                   <Wallet size={18} />
//                 </button>

//                 {/* WALLET POPUP */}
//                 <AnimatePresence>
//                   {walletOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       className="absolute right-16 top-14 w-64 bg-white rounded-2xl shadow-xl z-50 p-5"
//                     >
//                       <div className="flex items-center justify-between mb-3">
//                         <h3 className="font-semibold text-slate-700">
//                           Wallet Balance
//                         </h3>

//                         <button onClick={() => setWalletOpen(false)}>
//                           <X size={18} />
//                         </button>
//                       </div>

//                       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 text-center">
//                         <p className="text-xs opacity-80">Available Balance</p>
//                         <p className="text-2xl font-bold mt-1">
//                           ₹ {wallet.toLocaleString()}
//                         </p>
//                       </div>

//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </>
//             )}

//             {/* 🔔 NOTIFICATION */}
//             <NotificationBell />

//             {/* PROFILE */}
//             <button
//               onClick={() => setProfileOpen(!profileOpen)}
//               className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold uppercase"
//             >
//               {localStorage.getItem("email")?.charAt(0)}
//             </button>

//             {/* PROFILE DROPDOWN */}
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
//                       <p className="text-xs text-slate-500">{user.role}</p>
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
//               {/* <div className="bg-white rounded-2xl shadow p-6">
//               <h1 className="text-xl font-bold">
//                 Welcome {user.department} Admin 👋
//               </h1>
//             </div> */}
//               <Admin />
//             </>
//           )}

//           {page === "create" && (
//             <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
//               <CreateEmployee
//                 department={user.department}
//                 onCreate={createEmployee}
//               />
//             </div>
//           )}

//           {page === "employees" && (
//             <EmployeeList
//               employees={employees}
//               onDelete={deleteEmployee}
//               onEdit={setEditEmployee}
//             />

//           )}

//           {page === "purchaserequest" && user.department === "Purchase" && (
//             <AdminApprovals />
//           )}

//           {page === "createvendor" && user.department === "Purchase" && (
//             <CreateVendor />
//           )}

//           {page === "vendors" && user.department === "Purchase" && (
//             <VendorList />
//           )}

//           {page === "createpo" && user.department === "Purchase" && selectedPR && (
//             <CreatePo
//               prData={selectedPR}
//               onSuccess={() => {
//                 setPage("po-list");
//                 setSelectedPR(null);
//               }}
//             />
//           )}

//           {page === "po-list" && user.department === "Purchase" && (
//             <PoReadyList setSelectedPR={setSelectedPR} setPage={setPage} />
//           )}


//           {page === "accountspayment" && user.department === "Account" && (
//             <AccountsPayment />
//           )}

//           {page === "paymenthistory" &&
//             user.department === "Account" && (
//               <AccountsPaymentHistory />
//             )}

//           {page === "create-client" &&
//             user.department === "Account" && (
//               <AccountsCreateClient />
//             )}

//           {page === "create-invoice" &&
//             user.department === "Account" && (
//               <AccountsCreateInvoice saleData={saleData} />
//             )}

//           {page === "pending-payments" &&
//             user.department === "Account" && (
//               <AccountsPending />
//             )}

//           {page === "grn" &&
//             user.department === "Manufacturing" && (
//               <GRNReceive />
//             )}

//           {page === "rawmaterials" &&
//             user.department === "Manufacturing" && (
//               <RawMaterial />
//             )}

//           {page === "createmanufecture" &&
//             user.department === "Manufacturing" && (
//               <ManufectureCreate />
//             )}

//           {page === "completeproduction" &&
//             user.department === "Manufacturing" && (
//               <ProductionShow />
//             )}


//           {page === "product" &&
//             user.department === "Sales" && (
//               <SalesAdmin />
//             )}

//           {page === "sales-history" && user.department === "Sales" && (
//             <SalesHistory />
//           )}


//           {page === "sales-history" && user.department === "Account" && (
//             <SalesHistory />
//           )}

//           {page === "client" && user.department === "Account" && (
//             <AccountClients />
//           )}

//            {page === "vendormsg" && user.department === "Account" && (
//             <SendVendorMessage />
//           )}

//           {page === "pendinginvoice" && user.department === "Account" && (
//             <AccountsSalesList setSaleData={setSaleData} setPage={setPage} />
//           )}


//           {page === "paymentReminder" && user.department === "Account" && (
//             <PaymentReminder />
//           )}

//           {page === "Client" && user.department === "Sales" && (
//             <AccountClients />
//           )}


//         </main>
//       </div>

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
//               className="fixed inset-0 flex items-center justify-center px-4"
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
//                   <p className="text-sm text-slate-500">
//                     Keep your account secure
//                   </p>
//                 </div>

//                 <div className="space-y-4">
//                   <InputField
//                     icon={<Lock size={18} />}
//                     placeholder="Current Password"
//                     value={oldPass}
//                     onChange={setOldPass}
//                     type="password"
//                   />
//                   <InputField
//                     icon={<Lock size={18} />}
//                     placeholder="New Password"
//                     value={newPass}
//                     onChange={setNewPass}
//                     type="password"
//                   />
//                 </div>

//                 <button
//                   onClick={changePassword}
//                   className="w-full mt-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
//                 >
//                   Update Password
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ================= CREATED MODAL ================= */}
//       <CreatedEmployeeModal
//         createdEmployee={createdEmployee}
//         setCreatedEmployee={setCreatedEmployee}
//       />

//       <AnimatePresence>
//         {editEmployee && (
//           <motion.div
//             key="edit-employee-modal"
//             className="fixed inset-0 z-50"
//           >
//             {/* BACKDROP */}
//             <motion.div
//               className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//               onClick={() => setEditEmployee(null)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />

//             {/* MODAL */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="absolute inset-0 flex items-center justify-center px-4"
//             >
//               <div className="relative bg-white max-w-md w-full rounded-3xl p-7 shadow-2xl">

//                 {/* CLOSE BUTTON */}
//                 <button
//                   onClick={() => setEditEmployee(null)}
//                   className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
//                 >
//                   <X size={20} />
//                 </button>

//                 <h2 className="text-xl font-bold mb-6">Edit Employee</h2>

//                 {/* INPUTS */}
//                 <div className="space-y-3">
//                   <InputField
//                     icon={<User />}
//                     placeholder="Name"
//                     value={editEmployee.name}
//                     onChange={(v) =>
//                       setEditEmployee({ ...editEmployee, name: v })
//                     }
//                   />

//                   <InputField
//                     icon={<Mail />}
//                     placeholder="Email"
//                     value={editEmployee.email}
//                     onChange={(v) =>
//                       setEditEmployee({ ...editEmployee, email: v })
//                     }
//                   />
//                 </div>

//                 {/* ACTIONS */}
//                 <div className="flex justify-end gap-3 mt-6">
//                   <button
//                     onClick={() => setEditEmployee(null)}
//                     className="px-4 py-2 border rounded-xl"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     onClick={updateEmployee}
//                     className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }
// /* ======================= COMPONENTS ======================= */
// function Sidebar({ setPage, page, logout, department }) {
//   const activeClass = "bg-indigo-600 text-white";
//   const normalClass = "text-slate-300 hover:bg-[#0f172a]";

//   const menuClass = (p) =>
//     `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${page === p ? activeClass : normalClass
//     }`;

//   return (
//     <div className="flex flex-col h-full">

//       {/* 🔵 HEADER FIXED */}
//       <div className="px-10 py-5 border-b border-slate-800 flex items-center gap-3 hidden md:flex">

//         <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold">
//           CJ
//         </div>
//         <div className="text-lg font-semibold">
//           Copper<span className="text-indigo-400">Jems</span>
//         </div>
//       </div>

//       {/* 🔽 SCROLL MENU */}
//       <div className="flex-1 overflow-y-auto px-4 sidebar-scroll">

//         {/* DASHBOARD */}
//         <Section title="DASHBOARD" />
//         <button onClick={() => setPage("dashboard")} className={menuClass("dashboard")}>
//           <LayoutDashboard size={18} /> Dashboard
//         </button>

//         {/* EMPLOYEE */}
//         <Section title="EMPLOYEE MANAGEMENT" />
//         <button onClick={() => setPage("create")} className={menuClass("create")}>
//           <UserPlus size={18} /> Create Employee
//         </button>

//         <button onClick={() => setPage("employees")} className={menuClass("employees")}>
//           <Users size={18} /> Employees
//         </button>

//         {/* ACCOUNTS */}
//         {department === "Account" && (
//           <>
//             <Section title="ACCOUNTS" />

//             <button onClick={() => setPage("accountspayment")} className={menuClass("accountspayment")}>
//               <FaWallet size={18} /> Payments
//             </button>

//             <button onClick={() => setPage("paymenthistory")} className={menuClass("paymenthistory")}>
//               <FaReceipt size={18} /> Payment History
//             </button>

//             <Section title="SALES" />

//             <button onClick={() => setPage("sales-history")} className={menuClass("sales-history")}>
//               <FaShoppingCart size={18} /> Sales History
//             </button>

//             <Section title="CLIENTS" />

//             <button onClick={() => setPage("create-client")} className={menuClass("create-client")}>
//               <FaUserPlus size={18} /> Create Client
//             </button>

//             <button onClick={() => setPage("client")} className={menuClass("client")}>
//               <Users size={18} />Clients
//             </button>

//             <button onClick={() => setPage("vendormsg")} className={menuClass("vendormsg")}>
//               <FaWhatsapp size={18} /> Send Massage To Vendor
//             </button>

//             <button onClick={() => setPage("pendinginvoice")} className={menuClass("pendinginvoice")}>
//               <FileClock size={18} />PendingInvoice
//             </button>

//             <button onClick={() => setPage("create-invoice")} className={menuClass("create-invoice")}>
//               <FaFileInvoice size={18} /> Generate Bill
//             </button>

//             <button onClick={() => setPage("pending-payments")} className={menuClass("pending-payments")}>
//               <FaWallet size={18} /> Pending Payments
//             </button>

//             <button onClick={() => setPage("paymentReminder")} className={menuClass("paymentReminder")}>
//               <FaWhatsapp size={18} /> Payment Reminder
//             </button>
//           </>
//         )}

//         {/* MANUFACTURING */}
//         {department === "Manufacturing" && (
//           <>
//             <Section title="Manufacturing" />

//             <button onClick={() => setPage("grn")} className={menuClass("grn")}>
//               <FaBoxes size={18} /> GRN
//             </button>

//             <button onClick={() => setPage("rawmaterials")} className={menuClass("rawmaterials")}>
//               🏭 Raw Materials
//             </button>

//             <button onClick={() => setPage("createmanufecture")} className={menuClass("createmanufecture")}>
//               <FaPlusCircle size={18} /> Create Production
//             </button>

//             <button onClick={() => setPage("completeproduction")} className={menuClass("completeproduction")}>
//               <CheckCircle size={18} /> Complete Production
//             </button>
//           </>
//         )}

//         {/* SALES */}
//         {department === "Sales" && (
//           <>
//             <Section title="Sales" />

//             <button onClick={() => setPage("product")} className={menuClass("product")}>
//               <CheckCircle size={18} /> Approve Stock
//             </button>

//             <button onClick={() => setPage("sales-history")} className={menuClass("sales-history")}>
//               <FaShoppingCart size={18} /> Sales History
//             </button>

//             <Section title="Client" />

//             <button onClick={() => setPage("Client")} className={menuClass("Client")}>
//               <UserPlus size={18} /> Clients
//             </button>
//           </>
//         )}

//         {/* PURCHASE */}
//         {department === "Purchase" && (
//           <>
//             <Section title="Purchase" />

//             <button onClick={() => setPage("purchaserequest")} className={menuClass("purchaserequest")}>
//               <CheckCircle size={18} /> Purchase Request
//             </button>

//             <button onClick={() => setPage("po-list")} className={menuClass("po-list")}>
//               <FilePlus size={18} /> Create PurchaseOrder
//             </button>

//             <Section title="Vendor" />

//             <button onClick={() => setPage("createvendor")} className={menuClass("createvendor")}>
//               <UserPlus size={18} /> Create Vendor
//             </button>

//             <button onClick={() => setPage("vendors")} className={menuClass("vendors")}>
//               <Building2 size={18} /> Vendors
//             </button>


//           </>
//         )}

//       </div>

//       {/* 🔴 LOGOUT FIXED BOTTOM */}
//       <div className="p-4 border-t border-slate-800">
//         <button
//           onClick={logout}
//           className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>

//     </div>
//   );
// }
// function CreateEmployee({ department, onCreate }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const submit = () => {
//     onCreate({ name, email });
//     setName("");
//     setEmail("");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 25 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="
//     w-full
//     max-w-xl
//     mx-auto
//     bg-white
//     rounded-3xl
//     shadow-xl
//     p-6
//     sm:p-10
//   "
//     >
//       {/* HEADER */}
//       <div className="text-center mb-6">
//         <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4">
//           <UserPlus className="text-white" />
//         </div>

//         <h2 className="text-2xl font-bold">Create Employee</h2>

//         <p className="text-sm text-slate-500">
//           Add employee to {department} department
//         </p>
//       </div>

//       {/* FORM */}
//       <div className="space-y-5 w-full">

//         <InputField
//           icon={<User />}
//           placeholder="Employee Name"
//           value={name}
//           onChange={setName}
//         />

//         <InputField
//           icon={<Mail />}
//           placeholder="Employee Email"
//           value={email}
//           onChange={setEmail}
//         />

//         <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl text-sm w-full">
//           <Building2 size={18} />
//           Department: <b>{department}</b>
//         </div>

//         <button
//           onClick={submit}
//           className="
//         w-full
//         py-3
//         rounded-xl
//         bg-indigo-600
//         hover:bg-indigo-700
//         text-white
//         font-semibold
//         transition
//       "
//         >
//           Create Employee
//         </button>

//       </div>
//     </motion.div>

//   );
// }

// function EmployeeList({ employees, onDelete, onEdit }) {
//   return (
//     <div className="w-full">

//       {/* 🔵 HEADER */}
//       <div className="flex items-center gap-4 mb-6 p-2">
//         <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
//           <Users className="text-indigo-600" size={22} />
//         </div>

//         <div>
//           <h2 className="text-xl font-bold text-slate-800">
//             Employees
//           </h2>
//           <p className="text-sm text-slate-500">
//             Manage all department employees
//           </p>
//         </div>
//       </div>

//       {/* 🔵 GRID */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-6">
//         {employees.map((e) => (
//           <div
//             key={e._id}
//             className="
//               relative
//               bg-white rounded-2xl shadow-md
//               border-l-4 border-indigo-600
//               p-5 flex flex-col justify-between
//               hover:shadow-lg transition
//               min-h-[160px]
//             "
//           >
//             {/* DEPARTMENT BADGE */}
//             <span
//               className="
//                 absolute top-4 right-4
//                 text-xs font-medium
//                 bg-indigo-50 text-indigo-600
//                 px-3 py-1 rounded-full
//               "
//             >
//               {e.department}
//             </span>

//             {/* INFO */}
//             <div>
//               <p className="font-semibold text-lg text-slate-800">
//                 {e.name}
//               </p>
//               <p className="text-sm text-slate-500">{e.email}</p>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-3 mt-5 pt-4 border-t">
//               <button
//                 onClick={() => onEdit(e)}
//                 className="
//                   flex items-center gap-2
//                   px-4 py-2 text-sm
//                   rounded-lg border
//                   text-indigo-600 border-indigo-200
//                   hover:bg-indigo-50
//                 "
//               >
//                 <Pencil size={16} />
//                 Edit
//               </button>

//               <button
//                 onClick={() => onDelete(e._id)}
//                 className="
//                   flex items-center gap-2
//                   px-4 py-2 text-sm
//                   rounded-lg border
//                   text-red-600 border-red-200
//                   hover:bg-red-50
//                 "
//               >
//                 <Trash2 size={16} />
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// function CreatedEmployeeModal({ createdEmployee, setCreatedEmployee }) {
//   if (!createdEmployee) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         key="created-employee-modal"
//         className="fixed inset-0 z-50"
//       >
//         {/* BACKDROP */}
//         <motion.div
//           className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//           onClick={() => setCreatedEmployee(null)}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         />

//         {/* MODAL */}
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="absolute inset-0 flex items-center justify-center px-4"
//         >
//           <div className="relative bg-white max-w-md w-full rounded-3xl p-7 shadow-2xl">
//             <button
//               onClick={() => setCreatedEmployee(null)}
//               className="absolute top-4 right-4"
//             >
//               <X />
//             </button>

//             <h2 className="text-xl font-bold text-center mb-4">
//               Employee Created Successfully
//             </h2>

//             <div className="space-y-2 text-sm">
//               <p><b>Name:</b> {createdEmployee.name}</p>
//               <p><b>Email:</b> {createdEmployee.email}</p>
//               <p><b>Department:</b> {createdEmployee.department}</p>

//               <div className="flex items-center gap-3">
//                 <b>Password:</b>
//                 <span className="font-mono bg-slate-100 px-3 py-1 rounded">
//                   {createdEmployee.password}
//                 </span>
//                 <button
//                   onClick={() => {
//                     navigator.clipboard.writeText(createdEmployee.password);
//                     toast.success("Password copied");
//                   }}
//                   className="text-indigo-600 hover:text-indigo-800"
//                 >
//                   <Copy size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }


// function Section({ title }) {
//   return <p className="px-4 mt-6 mb-2 text-xs tracking-widest text-slate-400">{title}</p>;
// }

// function MenuItem({ icon: Icon, text, onClick }) {
//   return (
//     <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-[#111C33]">
//       <Icon size={18} />
//       {text}
//     </button>
//   );
// }

// function InputField({ icon, placeholder, value, onChange, type = "text" }) {
//   return (
//     <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl w-full">
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
  LayoutDashboard, Users, UserPlus, Trash2, X, Mail, User,
  Menu, LogOut, Lock, Building2, Copy, Pencil, FileText,
  CheckCircle, Wallet, FileClock, FilePlus
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import { toast } from "react-toastify";
import NotificationBell from "../components/NotificationBell";
import AdminApprovals from "./admin/AdminApprovals";
import AccountsPayment from "./accounts/AccountPayment";
import {
  FaBoxes, FaFileInvoice, FaPlusCircle, FaReceipt,
  FaShoppingCart, FaUserPlus, FaWallet, FaWhatsapp
} from "react-icons/fa";
import AccountsPaymentHistory from "./accounts/AccountPaymentHistory";
import GRNReceive from "./Manufecturing/GRNReceive";
import RawMaterial from "./Manufecturing/RawMaterial";
import ManufectureCreate from "./Manufecturing/ManufectureCreate";
import ProductionShow from "./Manufecturing/ProductionShow";
import SalesAdmin from "./sales/SalesAdmin";
import SalesHistory from "./sales/SalesHistory";
import AccountsCreateClient from "./accounts/AccountCreateClient";
import AccountsCreateInvoice from "./accounts/AccountCreateInvoice";
import AccountsPending from "./accounts/AccountPending";
import AccountClients from "./sales/AccountClients";
import PaymentReminder from "./accounts/PaymentReminder";
import AccountsSalesList from "./accounts/AccountsSalesList";
import CreateVendor from "./Purchase/CreateVendor";
import VendorList from "./Purchase/VendorList";
import CreatePo from "./Purchase/CreatePo";
import PoReadyList from "./Purchase/POReadyList";
import SendVendorMessage from "./accounts/SendVendorMessage";
import Admin from "./Admin";

// ── Theme tokens ──────────────────────────────────────────────
const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function AdminDashboard() {
  const [page,            setPage]            = useState("dashboard");
  const [employees,       setEmployees]       = useState([]);
  const [createdEmployee, setCreatedEmployee] = useState(null);
  const [editEmployee,    setEditEmployee]    = useState(null);
  const [user,            setUser]            = useState(null);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [profileOpen,     setProfileOpen]     = useState(false);
  const [changePassOpen,  setChangePassOpen]  = useState(false);
  const [walletOpen,      setWalletOpen]      = useState(false);
  const [wallet,          setWallet]          = useState(0);
  const [oldPass,         setOldPass]         = useState("");
  const [newPass,         setNewPass]         = useState("");
  const [saleData,        setSaleData]        = useState(null);
  const [selectedPR,      setSelectedPR]      = useState(null);

  useEffect(() => {
    if (user?.department === "Account") {
      axios.get("/account/wallet").then(res => setWallet(res.data.walletBalance || 0));
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setUser(jwtDecode(token));
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/employee/all", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        setEmployees(res.data);
      } catch { toast.error("Failed to load employees"); }
    };
    fetchEmployees();
  }, []);

  const logout = () => { localStorage.clear(); window.location.href = "/"; };

  const updateEmployee = async () => {
    try {
      await axios.put(`/employee/update/${editEmployee._id}`, editEmployee, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setEmployees(prev => prev.map(e => e._id === editEmployee._id ? editEmployee : e));
      toast.success("Employee updated");
      setEditEmployee(null);
    } catch { toast.error("Failed to update employee"); }
  };

  const changePassword = async () => {
    if (!oldPass || !newPass) { toast.warning("Fill all fields"); return; }
    try {
      await axios.post("/admin/change-password",
        { oldPassword: oldPass, newPassword: newPass },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      toast.success("Password updated");
      setChangePassOpen(false); setOldPass(""); setNewPass("");
    } catch { toast.error("Old password incorrect"); }
  };

  const createEmployee = async ({ name, email }) => {
    try {
      const res = await axios.post("/employee/create", { name, email }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      const { employee, password } = res.data;
      setEmployees(prev => [...prev, employee]);
      setCreatedEmployee({ name: employee.name, email: employee.email, department: employee.department, password });
      toast.success("Employee created");
    } catch { toast.error("Failed to create employee"); }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`/employee/delete/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setEmployees(prev => prev.filter(e => e._id !== id));
      toast.success("Employee deleted");
    } catch { toast.error("Failed to delete employee"); }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: "#0c0c14" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden md:flex fixed left-0 top-0 w-72 h-screen flex-col z-40"
        style={{ background: "rgba(14,12,30,0.98)", borderRight: `1px solid ${BORDER}` }}
      >
        <Sidebar setPage={setPage} page={page} logout={logout} department={user.department} />
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
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, boxShadow: `0 0 16px rgba(99,102,241,0.4)` }}>
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
                <Sidebar setPage={(p) => { setPage(p); setMobileOpen(false); }}
                  page={page} department={user.department} logout={logout} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN ── */}
      <div className="flex flex-col min-h-screen md:ml-72 flex-1 min-w-0">

        {/* ── TOPBAR ── */}
        <header
          className="h-19 flex items-center justify-between px-6 sticky top-0 z-30"
          style={{
            background: "rgba(16,14,35,0.98)",
            borderBottom: `1px solid ${BORDER}`,
            backdropFilter: "blur(12px)",
          }}
        >
          <button onClick={() => setMobileOpen(true)} className="md:hidden" style={{ color: TEXT1 }}>
            <Menu />
          </button>

          <h2 className="text-md max-sm:hidden font-semibold" style={{ color: TEXT1 }}>
            {user.department} Admin Dashboard
          </h2>

          <div className="relative flex items-center gap-3">

            {/* Wallet — Account only */}
            {user.department === "Account" && (
              <>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setWalletOpen(!walletOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    border: `1px solid rgba(99,102,241,0.3)`,
                    color: VIOLET,
                  }}
                >
                  <Wallet size={18} />
                </motion.button>

                <AnimatePresence>
                  {walletOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0,  scale: 1    }}
                      exit={{   opacity: 0, y: 10               }}
                      className="absolute right-16 top-14 w-64 rounded-2xl z-50 p-5"
                      style={{
                        background: CARD,
                        border: `1px solid ${BORDER}`,
                        boxShadow: "0 20px 48px rgba(0,0,0,0.6)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-sm" style={{ color: TEXT1 }}>Wallet Balance</h3>
                        <button onClick={() => setWalletOpen(false)} style={{ color: TEXT2 }}>
                          <X size={18} />
                        </button>
                      </div>
                      <div className="rounded-xl p-4 text-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.2))",
                          border: `1px solid rgba(99,102,241,0.3)`,
                        }}>
                        <p className="text-xs" style={{ color: TEXT2 }}>Available Balance</p>
                        <p className="text-2xl font-bold mt-1" style={{ color: TEXT1 }}>
                          ₹ {wallet.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            <NotificationBell />

            {/* Avatar */}
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
                      <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>{user.role}</p>
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
          {page === "dashboard"          && <Admin />}
          {page === "create"             && <div className="flex items-center justify-center min-h-[calc(100vh-120px)]"><CreateEmployee department={user.department} onCreate={createEmployee} /></div>}
          {page === "employees"          && <EmployeeList employees={employees} onDelete={deleteEmployee} onEdit={setEditEmployee} />}
          {page === "purchaserequest"    && user.department === "Purchase"      && <AdminApprovals />}
          {page === "createvendor"       && user.department === "Purchase"      && <CreateVendor />}
          {page === "vendors"            && user.department === "Purchase"      && <VendorList />}
          {page === "createpo"           && user.department === "Purchase"      && selectedPR && <CreatePo prData={selectedPR} onSuccess={() => { setPage("po-list"); setSelectedPR(null); }} />}
          {page === "po-list"            && user.department === "Purchase"      && <PoReadyList setSelectedPR={setSelectedPR} setPage={setPage} />}
          {page === "accountspayment"    && user.department === "Account"       && <AccountsPayment />}
          {page === "paymenthistory"     && user.department === "Account"       && <AccountsPaymentHistory />}
          {page === "create-client"      && user.department === "Account"       && <AccountsCreateClient />}
          {page === "create-invoice"     && user.department === "Account"       && <AccountsCreateInvoice saleData={saleData} />}
          {page === "pending-payments"   && user.department === "Account"       && <AccountsPending />}
          {page === "grn"                && user.department === "Manufacturing" && <GRNReceive />}
          {page === "rawmaterials"       && user.department === "Manufacturing" && <RawMaterial />}
          {page === "createmanufecture"  && user.department === "Manufacturing" && <ManufectureCreate />}
          {page === "completeproduction" && user.department === "Manufacturing" && <ProductionShow />}
          {page === "product"            && user.department === "Sales"         && <SalesAdmin />}
          {page === "sales-history"      && user.department === "Sales"         && <SalesHistory />}
          {page === "sales-history"      && user.department === "Account"       && <SalesHistory />}
          {page === "client"             && user.department === "Account"       && <AccountClients />}
          {page === "vendormsg"          && user.department === "Account"       && <SendVendorMessage />}
          {page === "pendinginvoice"     && user.department === "Account"       && <AccountsSalesList setSaleData={setSaleData} setPage={setPage} />}
          {page === "paymentReminder"    && user.department === "Account"       && <PaymentReminder />}
          {page === "Client"             && user.department === "Sales"         && <AccountClients />}
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
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="fixed inset-0 flex items-center justify-center px-4 z-50"
            >
              <div className="max-w-md w-full rounded-3xl p-8 relative"
                style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 32px 64px rgba(0,0,0,0.7)" }}>
                {/* Top glow */}
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "160px", height: "1px", background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)` }} />

                <button onClick={() => setChangePassOpen(false)} className="absolute top-4 right-4" style={{ color: TEXT2 }}>
                  <X />
                </button>

                <div className="text-center mb-6">
                  <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, boxShadow: `0 0 24px rgba(99,102,241,0.4)` }}>
                    <Lock className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: TEXT1 }}>Change Password</h2>
                  <p className="text-sm mt-1" style={{ color: TEXT2 }}>Keep your account secure</p>
                </div>

                <div className="space-y-4">
                  <DarkInput icon={<Lock size={18} />} placeholder="Current Password" value={oldPass} onChange={setOldPass} type="password" />
                  <DarkInput icon={<Lock size={18} />} placeholder="New Password"     value={newPass} onChange={setNewPass} type="password" />
                </div>

                <motion.button whileTap={{ scale: 0.97 }} onClick={changePassword}
                  className="w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm"
                  style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, boxShadow: `0 4px 16px rgba(99,102,241,0.35)` }}>
                  Update Password
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── CREATED EMPLOYEE MODAL ── */}
      <CreatedEmployeeModal createdEmployee={createdEmployee} setCreatedEmployee={setCreatedEmployee} />

      {/* ── EDIT EMPLOYEE MODAL ── */}
      <AnimatePresence>
        {editEmployee && (
          <motion.div key="edit-employee-modal" className="fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
              onClick={() => setEditEmployee(null)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="relative max-w-md w-full rounded-3xl p-7"
                style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 32px 64px rgba(0,0,0,0.7)" }}>
                <button onClick={() => setEditEmployee(null)} className="absolute top-4 right-4" style={{ color: TEXT2 }}>
                  <X size={20} />
                </button>
                <h2 className="text-xl font-bold mb-6" style={{ color: TEXT1 }}>Edit Employee</h2>
                <div className="space-y-3">
                  <DarkInput icon={<User />}  placeholder="Name"  value={editEmployee.name}  onChange={v => setEditEmployee({ ...editEmployee, name: v })} />
                  <DarkInput icon={<Mail />}  placeholder="Email" value={editEmployee.email} onChange={v => setEditEmployee({ ...editEmployee, email: v })} />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setEditEmployee(null)}
                    className="px-4 py-2 rounded-xl text-sm transition"
                    style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: TEXT2 }}>
                    Cancel
                  </button>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={updateEmployee}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})` }}>
                    Save
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── SIDEBAR ─────────────────────────────────────────── */
function Sidebar({ setPage, page, logout, department }) {

  const Btn = ({ id, icon: Icon, label }) => {
    const isActive = page === id;
    return (
      <button
        onClick={() => setPage(id)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium"
        style={{
          background: isActive ? "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.2))" : "transparent",
          border: isActive ? `1px solid rgba(99,102,241,0.4)` : "1px solid transparent",
          color: isActive ? TEXT1 : TEXT2,
          boxShadow: isActive ? "0 2px 12px rgba(99,102,241,0.2)" : "none",
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
      <div className="h-19 px-6 py-5 hidden md:flex items-center gap-3"
        style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, boxShadow: `0 0 20px rgba(99,102,241,0.45)` }}>
          CJ
        </div>
        <div className="text-lg font-semibold" style={{ color: TEXT1 }}>
          Copper<span style={{ color: VIOLET }}>Jems</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1" style={{ scrollbarWidth: "none" }}>

        <Section title="DASHBOARD" />
        <Btn id="dashboard" icon={LayoutDashboard} label="Dashboard" />

        <Section title="EMPLOYEE MANAGEMENT" />
        <Btn id="create"    icon={UserPlus} label="Create Employee" />
        <Btn id="employees" icon={Users}    label="Employees" />

        {department === "Account" && <>
          <Section title="ACCOUNTS" />
          <Btn id="accountspayment"  icon={FaWallet}       label="Payments" />
          <Btn id="paymenthistory"   icon={FaReceipt}      label="Payment History" />
          <Section title="SALES" />
          <Btn id="sales-history"    icon={FaShoppingCart} label="Sales History" />
          <Section title="CLIENTS" />
          <Btn id="create-client"    icon={FaUserPlus}     label="Create Client" />
          <Btn id="client"           icon={Users}          label="Clients" />
          <Btn id="vendormsg"        icon={FaWhatsapp}     label="Send Message To Vendor" />
          <Btn id="pendinginvoice"   icon={FileClock}      label="Pending Invoice" />
          <Btn id="create-invoice"   icon={FaFileInvoice}  label="Generate Bill" />
          <Btn id="pending-payments" icon={FaWallet}       label="Pending Payments" />
          <Btn id="paymentReminder"  icon={FaWhatsapp}     label="Payment Reminder" />
        </>}

        {department === "Manufacturing" && <>
          <Section title="MANUFACTURING" />
          <Btn id="grn"                icon={FaBoxes}      label="GRN" />
          <Btn id="rawmaterials"       icon={({ size }) => <span style={{ fontSize: size }}>🏭</span>} label="Raw Materials" />
          <Btn id="createmanufecture"  icon={FaPlusCircle} label="Create Production" />
          <Btn id="completeproduction" icon={CheckCircle}  label="Complete Production" />
        </>}

        {department === "Sales" && <>
          <Section title="SALES" />
          <Btn id="product"       icon={CheckCircle}    label="Approve Stock" />
          <Btn id="sales-history" icon={FaShoppingCart} label="Sales History" />
          <Section title="CLIENT" />
          <Btn id="Client"        icon={UserPlus}       label="Clients" />
        </>}

        {department === "Purchase" && <>
          <Section title="PURCHASE" />
          <Btn id="purchaserequest" icon={CheckCircle}  label="Purchase Request" />
          <Btn id="po-list"         icon={FilePlus}     label="Create PurchaseOrder" />
          <Section title="VENDOR" />
          <Btn id="createvendor"    icon={UserPlus}     label="Create Vendor" />
          <Btn id="vendors"         icon={Building2}    label="Vendors" />
        </>}
      </div>

      {/* Logout */}
      <div className="p-4" style={{ borderTop: `1px solid ${BORDER}` }}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition"
          style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.22)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.12)"}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

/* ── CREATE EMPLOYEE ── */
function CreateEmployee({ department, onCreate }) {
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");

  const submit = () => { onCreate({ name, email }); setName(""); setEmail(""); };

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto rounded-3xl p-6 sm:p-10"
      style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div className="text-center mb-6">
        <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, boxShadow: `0 0 24px rgba(99,102,241,0.4)` }}>
          <UserPlus className="text-white" />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: TEXT1 }}>Create Employee</h2>
        <p className="text-sm mt-1" style={{ color: TEXT2 }}>Add employee to {department} department</p>
      </div>

      <div className="space-y-4">
        <DarkInput icon={<User />} placeholder="Employee Name"  value={name}  onChange={setName} />
        <DarkInput icon={<Mail />} placeholder="Employee Email" value={email} onChange={setEmail} />

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ background: "rgba(99,102,241,0.07)", border: `1px solid ${BORDER}`, color: TEXT2 }}>
          <Building2 size={18} style={{ color: VIOLET }} />
          Department: <b style={{ color: TEXT1 }}>{department}</b>
        </div>

        <motion.button whileTap={{ scale: 0.97 }} onClick={submit}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm"
          style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, boxShadow: `0 4px 16px rgba(99,102,241,0.35)` }}>
          Create Employee
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── EMPLOYEE LIST ── */
function EmployeeList({ employees, onDelete, onEdit }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6 p-2">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, boxShadow: `0 0 20px rgba(99,102,241,0.4)` }}>
          <Users className="text-white" size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: TEXT1 }}>Employees</h2>
          <p className="text-sm mt-0.5" style={{ color: TEXT2 }}>Manage all department employees</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {employees.map((e) => (
          <div key={e._id} className="relative flex flex-col justify-between p-5 rounded-2xl"
            style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${INDIGO}`, boxShadow: "0 4px 24px rgba(0,0,0,0.4)", minHeight: "160px" }}>

            <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "rgba(99,102,241,0.15)", border: `1px solid rgba(99,102,241,0.3)`, color: VIOLET }}>
              {e.department}
            </span>

            <div>
              <p className="font-semibold text-base mt-1" style={{ color: TEXT1 }}>{e.name}</p>
              <p className="text-sm mt-0.5" style={{ color: TEXT2 }}>{e.email}</p>
            </div>

            <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
              <button onClick={() => onEdit(e)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition"
                style={{ background: "rgba(99,102,241,0.1)", border: `1px solid rgba(99,102,241,0.25)`, color: VIOLET }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}>
                <Pencil size={15} /> Edit
              </button>
              <button onClick={() => onDelete(e._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}>
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CREATED EMPLOYEE MODAL ── */
function CreatedEmployeeModal({ createdEmployee, setCreatedEmployee }) {
  if (!createdEmployee) return null;
  return (
    <AnimatePresence>
      <motion.div key="created-employee-modal" className="fixed inset-0 z-50">
        <motion.div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setCreatedEmployee(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center px-4">
          <div className="relative max-w-md w-full rounded-3xl p-7"
            style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 32px 64px rgba(0,0,0,0.7)" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "160px", height: "1px", background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)` }} />
            <button onClick={() => setCreatedEmployee(null)} className="absolute top-4 right-4" style={{ color: TEXT2 }}><X /></button>
            <h2 className="text-xl font-bold text-center mb-5" style={{ color: TEXT1 }}>Employee Created Successfully 🎉</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: "Name",       value: createdEmployee.name },
                { label: "Email",      value: createdEmployee.email },
                { label: "Department", value: createdEmployee.department },
              ].map(row => (
                <div key={row.label} className="flex justify-between px-3 py-2 rounded-xl"
                  style={{ background: "rgba(99,102,241,0.07)", border: `1px solid ${BORDER}` }}>
                  <span style={{ color: TEXT2 }}>{row.label}</span>
                  <span className="font-medium" style={{ color: TEXT1 }}>{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-3 py-2 rounded-xl"
                style={{ background: "rgba(99,102,241,0.07)", border: `1px solid ${BORDER}` }}>
                <span style={{ color: TEXT2 }}>Password</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono px-2 py-1 rounded-lg text-xs" style={{ background: "rgba(99,102,241,0.15)", color: VIOLET }}>
                    {createdEmployee.password}
                  </span>
                  <button onClick={() => { navigator.clipboard.writeText(createdEmployee.password); toast.success("Password copied"); }}
                    style={{ color: VIOLET }}>
                    <Copy size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── SHARED COMPONENTS ── */
function Section({ title }) {
  return <p className="text-xs px-4 mt-5 mb-2 tracking-widest font-semibold" style={{ color: "rgba(99,102,241,0.55)" }}>{title}</p>;
}

function DarkInput({ icon, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl w-full"
      style={{ background: "rgba(99,102,241,0.06)", border: `1px solid ${BORDER}`, transition: "all 0.2s" }}
      onFocus={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.6)"; e.currentTarget.style.background = "rgba(99,102,241,0.1)"; }}
      onBlur={e  => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = "rgba(99,102,241,0.06)"; }}
    >
      <span style={{ color: TEXT2 }}>{icon}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="bg-transparent w-full outline-none text-sm"
        style={{ color: TEXT1, caretColor: VIOLET }}
      />
    </div>
  );
}
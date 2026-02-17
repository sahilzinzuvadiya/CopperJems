// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaUsers,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaEdit,
//   FaTrash,
//   FaTimes
// } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function AccountClients() {
//   const [clients, setClients] = useState([]);
//   const [search, setSearch] = useState("");
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     creditDays: 0
//   });

//   const load = async () => {
//     try {
//       const res = await axios.get("/account/all");
//       setClients(res.data);
//     } catch {
//       toast.error("Failed to load clients");
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const filtered = clients.filter(c =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   /* ---------- DELETE ---------- */
//   const deleteClient = async (id) => {
//     if (!window.confirm("Delete client?")) return;

//     await axios.delete(`account/client/${id}`);
//     toast.success("Client deleted");
//     load();
//   };

//   /* ---------- EDIT OPEN ---------- */
//   const openEdit = (c) => {
//     setEditing(c);
//     setForm({
//       name: c.name,
//       phone: c.phone,
//       address: c.address,
//       creditDays: c.creditDays
//     });
//   };

//   /* ---------- SAVE EDIT ---------- */
//   const saveEdit = async () => {
//     await axios.put(`account/client/${editing._id}`, form);
//     toast.success("Client updated");
//     setEditing(null);
//     load();
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-4">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
//           <FaUsers className="text-white text-xl"/>
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">Clients</h1>
//           <p className="text-sm text-slate-500">Manage your customers</p>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <input
//         placeholder="Search client..."
//         value={search}
//         onChange={e=>setSearch(e.target.value)}
//         className="w-full md:w-80 border rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-indigo-500"
//       />

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
//         {filtered.map((c) => (
//           <motion.div
//             key={c._id}
//             whileHover={{ scale:1.03 }}
//             className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-600 relative"
//           >
//             <h3 className="text-lg font-semibold text-slate-800">{c.name}</h3>

//             <p className="text-sm mt-3 flex items-center gap-2 text-slate-600">
//               <FaPhone className="text-indigo-600"/>
//               {c.phone || "-"}
//             </p>

//             <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
//               <FaMapMarkerAlt className="text-indigo-600"/>
//               {c.address || "-"}
//             </p>

//             <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
//               <FaCalendarAlt className="text-indigo-600"/>
//               Credit: <b>{c.creditDays || 0} days</b>
//             </p>

//             {/* BUTTONS */}
//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={()=>openEdit(c)}
//                 className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
//               >
//                 <FaEdit/> Edit
//               </button>

//               <button
//                 onClick={()=>deleteClient(c._id)}
//                 className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
//               >
//                 <FaTrash/> Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* EDIT MODAL */}
//       <AnimatePresence>
//         {editing && (
//           <>
//             {/* BLUR BACKGROUND */}
//             <motion.div
//               initial={{ opacity:0 }}
//               animate={{ opacity:1 }}
//               exit={{ opacity:0 }}
//               className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//               onClick={()=>setEditing(null)}
//             />

//             {/* FORM */}
//             <motion.div
//               initial={{ scale:0.8, opacity:0 }}
//               animate={{ scale:1, opacity:1 }}
//               exit={{ scale:0.8, opacity:0 }}
//               className="fixed z-50 inset-0 flex items-center justify-center"
//             >
//               <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 relative">

//                 {/* CLOSE */}
//                 <button
//                   onClick={()=>setEditing(null)}
//                   className="absolute top-3 right-3 text-slate-500 hover:text-black"
//                 >
//                   <FaTimes/>
//                 </button>

//                 <h2 className="text-xl font-bold mb-4">Edit Client</h2>

//                 <input
//                   className="w-full border rounded-lg px-3 py-2 mb-3"
//                   placeholder="Name"
//                   value={form.name}
//                   onChange={e=>setForm({...form,name:e.target.value})}
//                 />

//                 <input
//                   className="w-full border rounded-lg px-3 py-2 mb-3"
//                   placeholder="Phone"
//                   value={form.phone}
//                   onChange={e=>setForm({...form,phone:e.target.value})}
//                 />

//                 <input
//                   className="w-full border rounded-lg px-3 py-2 mb-3"
//                   placeholder="Address"
//                   value={form.address}
//                   onChange={e=>setForm({...form,address:e.target.value})}
//                 />

//                 <input
//                   type="number"
//                   className="w-full border rounded-lg px-3 py-2 mb-4"
//                   placeholder="Credit days"
//                   value={form.creditDays}
//                   onChange={e=>setForm({...form,creditDays:e.target.value})}
//                 />

//                 <button
//                   onClick={saveEdit}
//                   className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSearch
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function AccountClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    creditDays: 0
  });

  const load = async () => {
    try {
      const res = await axios.get("/account/all");
      setClients(res.data);
    } catch {
      toast.error("Failed to load clients");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteClient = async (id) => {
    if (!window.confirm("Delete client?")) return;
    await axios.delete(`account/client/${id}`);
    toast.success("Client deleted");
    load();
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      name: c.name,
      phone: c.phone,
      address: c.address,
      creditDays: c.creditDays
    });
  };

  const saveEdit = async () => {
    await axios.put(`account/client/${editing._id}`, form);
    toast.success("Client updated");
    setEditing(null);
    load();
  };

  return (
    <div className="min-h-screen p-4">

{/* HEADER + SEARCH ROW */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

  {/* LEFT → TITLE */}
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
      <FaUsers className="text-white text-xl" />
    </div>

    <div className="leading-tight">
      <h1 className="text-2xl font-bold text-slate-800">Clients</h1>
      <p className="text-sm text-slate-500 m-0">Manage your customers</p>
    </div>
  </div>

  {/* RIGHT → SEARCH */}
  <div className="relative w-full lg:w-80">
    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

    <input
      placeholder="Search client..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="
        w-full
        pl-11 pr-4 py-3
        rounded-xl
        border border-slate-200
        bg-white
        shadow-sm
        focus:outline-none
        focus:ring-2 focus:ring-indigo-500
        focus:border-indigo-500
        text-sm
      "
    />
  </div>

</div>



      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <motion.div
            key={c._id}
            whileHover={{ scale:1.03 }}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-indigo-600 relative"
          >
            <h3 className="text-lg font-semibold text-slate-800">{c.name}</h3>

            <p className="text-sm mt-3 flex items-center gap-2 text-slate-600">
              <FaPhone className="text-indigo-600"/>
              {c.phone || "-"}
            </p>

            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <FaMapMarkerAlt className="text-indigo-600"/>
              {c.address || "-"}
            </p>

            <p className="text-sm mt-2 flex items-center gap-2 text-slate-600">
              <FaCalendarAlt className="text-indigo-600"/>
              Credit: <b>{c.creditDays || 0} days</b>
            </p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={()=>openEdit(c)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
              >
                <FaEdit/> Edit
              </button>

              <button
                onClick={()=>deleteClient(c._id)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
              >
                <FaTrash/> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EDIT MODAL (unchanged) */}
      <AnimatePresence>
        {editing && (
          <>
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              exit={{ opacity:0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={()=>setEditing(null)}
            />

            <motion.div
              initial={{ scale:0.8, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              exit={{ scale:0.8, opacity:0 }}
              className="fixed z-50 inset-0 flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 relative">

                <button
                  onClick={()=>setEditing(null)}
                  className="absolute top-3 right-3 text-slate-500 hover:text-black"
                >
                  <FaTimes/>
                </button>

                <h2 className="text-xl font-bold mb-4">Edit Client</h2>

                <input
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                  placeholder="Name"
                  value={form.name}
                  onChange={e=>setForm({...form,name:e.target.value})}
                />

                <input
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={e=>setForm({...form,phone:e.target.value})}
                />

                <input
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                  placeholder="Address"
                  value={form.address}
                  onChange={e=>setForm({...form,address:e.target.value})}
                />

                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2 mb-4"
                  placeholder="Credit days"
                  value={form.creditDays}
                  onChange={e=>setForm({...form,creditDays:e.target.value})}
                />

                <button
                  onClick={saveEdit}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

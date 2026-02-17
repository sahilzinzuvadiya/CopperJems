import { useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaUserPlus,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";

export default function AccountsCreateClient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    creditDays: ""
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.phone) {
      return toast.error("Name & phone required");
    }

    try {
      setLoading(true);
      await axios.post("/account/client", form);
      toast.success("Client created");

      setForm({
        name: "",
        phone: "",
        address: "",
        creditDays: ""
      });
    } catch {
      toast.error("Error");
    }

    setLoading(false);
  };

  return (
    <div className="h-[calc(80vh-60px)] p-4 md:p-8 flex justify-center items-start">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
            <FaUserPlus className="text-white text-lg" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Create Client
            </h2>
            <p className="text-sm text-slate-500">
              Add new customer for billing
            </p>
          </div>
        </div>

        {/* NAME */}
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Client Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
            className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* PHONE */}
        <div className="relative mb-4">
          <FaPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="WhatsApp Number"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
            className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* ADDRESS */}
        <div className="relative mb-4">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Address"
            value={form.address}
            onChange={(e)=>setForm({...form,address:e.target.value})}
            className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* CREDIT DAYS */}
        <div className="relative mb-6">
          <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Credit Days (30 / 45 etc)"
            value={form.creditDays}
            onChange={(e)=>setForm({...form,creditDays:e.target.value})}
            className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <FaUserPlus />
          {loading ? "Creating..." : "Create Client"}
        </button>
      </motion.div>
    </div>
  );
}

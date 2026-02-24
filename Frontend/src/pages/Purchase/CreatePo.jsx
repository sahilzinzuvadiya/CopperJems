import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Building2,
  FilePlus,
  IndianRupee,
  Hash,
  Truck,
  CalendarDays
} from "lucide-react";

export default function CreatePo({ prData, onSuccess }) {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    vendorId: "",
    rate: ""
  });

  /* ================= LOAD VENDORS ================= */
  useEffect(() => {
    axios.get("/vendor/Vendorall")   // ✅ FIXED
      .then(res => setVendors(res.data))
      .catch(() => toast.error("Failed to load vendors"));
  }, []);

  /* ================= SAFETY ================= */
  if (!prData) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-slate-400">
        Select purchase request first
      </div>
    );
  }

  const total =
    Number(prData.quantity || 0) * Number(form.rate || 0);

  /* ================= CREATE PO ================= */
  const submit = async () => {
    if (!form.vendorId || !form.rate)
      return toast.error("Fill all fields");

    try {
      setLoading(true);

      await axios.put(`/purchase/create-po/${prData._id}`, form);

      toast.success("PO Created Successfully");

      setForm({
        vendorId: "",
        rate: ""
      });

      onSuccess && onSuccess();

    } catch (err) {
      toast.error("Failed to create PO");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
        >

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <FilePlus className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Create Purchase Order
              </h2>
              <p className="text-sm text-slate-500">
                Generate PO from approved request
              </p>
            </div>
          </div>

          {/* PR INFO */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6 grid md:grid-cols-3 gap-4 text-sm">

            <Info icon={<Truck size={16}/>} label="Material" value={prData.materialName}/>
            <Info icon={<Hash size={16}/>} label="Qty" value={prData.quantity}/>
            <Info icon={<CalendarDays size={16}/>} label="Expected Price" value={`₹${prData.expectedPrice}`}/>

          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* VENDOR */}
            <div className="relative">
              <Building2 className="absolute left-3 top-3 text-gray-400" />

              <select
                value={form.vendorId}
                onChange={(e)=>setForm({...form,vendorId:e.target.value})}
                className="w-full border rounded-lg pl-10 pr-3 py-2"
              >
                <option value="">Select Vendor</option>

                {vendors.map(v=>(
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                ))}

              </select>
            </div>

            {/* RATE */}
            <div className="relative">
              <IndianRupee className="absolute left-3 top-3 text-gray-400" />

              <input
                type="number"
                placeholder="Final Rate"
                value={form.rate}
                onChange={(e)=>setForm({...form,rate:e.target.value})}
                className="w-full border rounded-lg pl-10 pr-3 py-2"
              />
            </div>

          </div>

          {/* TOTAL */}
          <div className="bg-indigo-50 rounded-xl p-4 flex justify-between mt-6">
            <span>Total Amount</span>
            <span className="font-bold text-lg">₹ {total}</span>
          </div>

          {/* BUTTON */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            {loading ? "Creating..." : "Create PO"}
          </button>

        </motion.div>
      </div>
    </div>
  );
}

/* INFO CARD */
function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

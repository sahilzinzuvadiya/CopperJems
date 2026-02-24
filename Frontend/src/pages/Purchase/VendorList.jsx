import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { Building2, Phone, Calendar } from "lucide-react";

export default function VendorList() {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios.get("/vendor/Vendorall")
      .then(res => setVendors(res.data));
  }, []);

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {vendors.map(v => (
        <motion.div
          key={v._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-md"
        >

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Building2 className="text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold">{v.name}</h3>
              <p className="text-sm text-slate-500">{v.email}</p>
            </div>
          </div>

          <div className="text-sm space-y-2">
            <p className="flex items-center gap-2">
              <Phone size={14}/> {v.phone}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={14}/> Credit: {v.creditDays} days
            </p>
          </div>

        </motion.div>
      ))}

    </div>
  );
}

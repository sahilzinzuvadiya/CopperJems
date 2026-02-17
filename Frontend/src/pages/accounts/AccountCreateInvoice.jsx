import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaFileInvoice,
  FaUser,
  FaCubes,
  FaRupeeSign,
  FaCalculator,
  FaCalendarAlt,
  FaWhatsapp
} from "react-icons/fa";

export default function AccountsCreateInvoice() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [invoiceData, setInvoiceData] = useState(null); // NEW

  const [form, setForm] = useState({
    clientId: "",
    wireType: "",
    qty: "",
    rate: "",
    creditDays: ""
  });

  const total = Number(form.qty || 0) * Number(form.rate || 0);

  useEffect(() => {
    axios.get("/account/clients").then(res => setClients(res.data));
  }, []);

  const selectClient = (id) => {
    const c = clients.find(x => x._id === id);
    setForm(prev => ({
      ...prev,
      clientId: id,
      creditDays: c?.creditDays || ""
    }));
  };

  const submit = async () => {
    if (!form.clientId || !form.qty || !form.rate)
      return toast.error("Fill all fields");

    try {
      setLoading(true);

      const res = await axios.post("/account/invoice", form);

      toast.success("Invoice generated");

      setInvoiceData(res.data); // store invoice

      setForm({
        clientId: "",
        wireType: "",
        qty: "",
        rate: "",
        creditDays: ""
      });

    } catch (err) {
      toast.error("Error generating invoice");
    }

    setLoading(false);
  };

  // 📲 SEND CLIENT
  const sendClient = () => {
    const { clientPhone, clientName, total, invoiceNo } = invoiceData;

    const msg = `
*CopperJems Pvt Ltd*

Dear ${clientName},

Your invoice has been generated successfully.

Invoice No: ${invoiceNo}
Amount: ₹${total}

Kindly contact accounts team for any queries.

Thank you for your business.
CopperJems Accounts Dept
`;

    window.open(
      `https://wa.me/${clientPhone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  // 📲 SEND ADMIN
  const sendAdmin = () => {
    const adminPhone = "919227896181";

    const { clientName, total, invoiceNo } = invoiceData;

    const msg = `
*CopperJems Accounts*

New Invoice Generated

Client: ${clientName}
Invoice: ${invoiceNo}
Amount: ₹${total}

Please record in accounts.
`;

    window.open(
      `https://wa.me/${adminPhone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="flex justify-center px-4 pt-6 pb-10">
      <div className="w-full max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
              <FaFileInvoice className="text-white text-lg" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Generate Invoice
              </h2>
              <p className="text-sm text-slate-500">
                CopperJems Billing System
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <select
                value={form.clientId}
                onChange={(e)=>selectClient(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2"
              >
                <option value="">Select Client</option>
                {clients.map(c=>(
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <FaCubes className="absolute left-3 top-3 text-gray-400" />
              <select
                value={form.wireType}
                onChange={(e)=>setForm({...form,wireType:e.target.value})}
                className="w-full border rounded-lg pl-10 pr-3 py-2"
              >
                <option value="">Select Wire</option>
                <option>6mm</option>
                <option>9mm</option>
                <option>12mm</option>
              </select>
            </div>

            <div className="relative">
              <FaCalculator className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                placeholder="Qty"
                value={form.qty}
                onChange={(e)=>setForm({...form,qty:e.target.value})}
                className="w-full border rounded-lg pl-10 pr-3 py-2"
              />
            </div>

            <div className="relative">
              <FaRupeeSign className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                placeholder="Rate"
                value={form.rate}
                onChange={(e)=>setForm({...form,rate:e.target.value})}
                className="w-full border rounded-lg pl-10 pr-3 py-2"
              />
            </div>

            <div className="relative md:col-span-2">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                value={form.creditDays}
                readOnly
                className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {/* TOTAL */}
          <div className="bg-indigo-50 rounded-xl p-4 flex justify-between mt-6">
            <span>Total</span>
            <span className="font-bold">₹ {total}</span>
          </div>

          {/* GENERATE BTN */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg"
          >
            {loading ? "Generating..." : "Generate Invoice"}
          </button>

          {/* ACTION BUTTONS */}
          {invoiceData && (
            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <button
                onClick={sendClient}
                className="bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> Send to Client
              </button>

              <button
                onClick={sendAdmin}
                className="bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> Send to Accounts
              </button>

            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}

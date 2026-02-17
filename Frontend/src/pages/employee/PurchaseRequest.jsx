import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import {
  Package,
  IndianRupee,
  Hash,
  Send
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function PurchaseRequest() {
  const [form, setForm] = useState({
    materialName: "",
    quantity: "",
    expectedPrice: ""
  });

  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const user = jwtDecode(token);

    if (user.department === "Purchase") {
      setAllowed(true);
    } else {
      toast.error("Only Purchase department can create requests");
    }
  }, []);

  if (!allowed) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Access denied. Only Purchase department allowed.
      </div>
    );
  }

  const submit = async () => {
    if (!form.materialName || !form.quantity || !form.expectedPrice) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/purchase/create", form);

      toast.success("Purchase request sent successfully");

      setForm({
        materialName: "",
        quantity: "",
        expectedPrice: ""
      });
    } catch {
      toast.error("Failed to create purchase request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
            <Package className="text-white" size={26} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            New Purchase Request
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Request raw material for manufacturing
          </p>
        </div>

        {/* ================= FORM ================= */}
        <div className="space-y-5">

          {/* MATERIAL TYPE */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">
              Material Type
            </label>

            <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl">
              <Package size={18} className="text-slate-400" />
              <select
                value={form.materialName}
                onChange={(e) =>
                  setForm({ ...form, materialName: e.target.value })
                }
                className="bg-transparent w-full outline-none text-sm"
              >
                <option value="">Select material</option>
                <option value="A_PLUS">A+ Grade Copper Scrap</option>
                <option value="A_GRADE">A Grade Copper Scrap</option>
                <option value="COPPER">Copper Scrap</option>
                <option value="MIXED">Mixed Scrap</option>
              </select>
            </div>
          </div>

          {/* QUANTITY + PRICE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* QUANTITY */}
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                Quantity
              </label>

              <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl">
                <Hash size={18} className="text-slate-400" />
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 100"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* PRICE */}
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                Expected Price (₹ / unit)
              </label>

              <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl">
                <IndianRupee size={18} className="text-slate-400" />
                <input
                  type="number"
                  min="1"
                  placeholder="₹ per unit"
                  value={form.expectedPrice}
                  onChange={(e) =>
                    setForm({ ...form, expectedPrice: e.target.value })
                  }
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={submit}
            disabled={loading}
            className={`
              w-full mt-6 py-3 rounded-xl
              flex items-center justify-center gap-2
              font-semibold text-white transition
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
            `}
          >
            <Send size={18} />
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

 const handleLogin = async () => {
  if (!email || !password) {
    toast.warning("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post("/auth/login", {
      email,
      password
    });

    // SAVE DATA
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("department", res.data.department || "");

    toast.success("Login successful");

    setTimeout(() => {
  const role = res.data.role;

  if (role === "superadmin") {
    navigate("/superadmin");
  } else if (role === "admin") {
    navigate("/admin");
  } else if (role === "employee") {
    navigate("/employee");
  } else {
    navigate("/"); // fallback safety
  }
}, 1000);


  } catch (err) {
    toast.error("Invalid email or password");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-9"
      >

        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 select-none">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
              <span className="text-white font-extrabold text-xl">CJ</span>
            </div>

            <h1 className="text-2xl font-bold tracking-wide text-gray-900">
              Copper<span className="text-indigo-600">Jems</span>
            </h1>
          </div>

          
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="admin@copperjems.com"
            className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300
                       focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg text-white font-semibold
                     bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Sign In
        </button>

      </motion.div>
    </div>
  );
}

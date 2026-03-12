// import { motion } from "framer-motion";
// import { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//  const handleLogin = async () => {
//   if (!email || !password) {
//     toast.warning("Please fill all fields");
//     return;
//   }

//   try {
//     const res = await axios.post("/auth/login", {
//       email,
//       password
//     });

//     // SAVE DATA
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("email", res.data.email);
//     localStorage.setItem("role", res.data.role);
//     localStorage.setItem("department", res.data.department || "");

//     toast.success("Login successful");

//     setTimeout(() => {
//   const role = res.data.role;

//   if (role === "superadmin") {
//     navigate("/superadmin");
//   } else if (role === "admin") {
//     navigate("/admin");
//   } else if (role === "employee") {
//     navigate("/employee");
//   } else {
//     navigate("/"); // fallback safety
//   }
// }, 1000);


//   } catch (err) {
//     toast.error("Invalid email or password");
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">

//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white w-full max-w-md rounded-2xl shadow-xl p-9"
//       >

//         {/* LOGO */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center items-center gap-3 select-none">
//             <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
//               <span className="text-white font-extrabold text-xl">CJ</span>
//             </div>

//             <h1 className="text-2xl font-bold tracking-wide text-gray-900">
//               Copper<span className="text-indigo-600">Jems</span>
//             </h1>
//           </div>

          
//         </div>

//         {/* EMAIL */}
//         <div className="mb-5">
//           <label className="text-sm font-medium text-gray-700">
//             Email Address
//           </label>
//           <input
//             type="email"
//             placeholder="admin@copperjems.com"
//             className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300
//                        focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* PASSWORD */}
//         <div className="mb-6">
//           <label className="text-sm font-medium text-gray-700">
//             Password
//           </label>

//           <div className="relative mt-1">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300
//                          focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* BUTTON */}
//         <button
//           onClick={handleLogin}
//           className="w-full py-3 rounded-lg text-white font-semibold
//                      bg-indigo-600 hover:bg-indigo-700 transition"
//         >
//           Sign In
//         </button>

//       </motion.div>
//     </div>
//   );
// }
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
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("department", res.data.department || "");
      toast.success("Login successful");
      setTimeout(() => {
        const role = res.data.role;
        if (role === "superadmin") navigate("/superadmin");
        else if (role === "admin") navigate("/admin");
        else if (role === "employee") navigate("/employee");
        else navigate("/");
      }, 1000);
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "#0c0c14",
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 40% 30% at 80% 80%, rgba(129,140,248,0.06) 0%, transparent 50%)
        `,
      }}
    >
      {/* Grid texture overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(160deg, rgba(30,27,60,0.95) 0%, rgba(18,16,40,0.98) 100%)",
          border: "1px solid rgba(99,102,241,0.2)",
          boxShadow: `
            0 0 0 1px rgba(129,140,248,0.05) inset,
            0 32px 64px rgba(0,0,0,0.6),
            0 0 80px rgba(99,102,241,0.08)
          `,
        }}
        className="w-full max-w-md rounded-2xl p-9 relative overflow-hidden"
      >
        {/* Card inner top glow */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "200px", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.6), transparent)",
        }} />

        {/* LOGO */}
        <div className="text-center mb-9">
          <div className="flex justify-center items-center gap-3 select-none mb-3">
            <motion.div
              whileHover={{ scale: 1.06, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)",
                boxShadow: "0 0 0 4px rgba(99,102,241,0.15), 0 8px 24px rgba(99,102,241,0.5)",
              }}
              className="w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <span className="text-white font-extrabold text-xl tracking-tight">CJ</span>
            </motion.div>

            <h1 className="text-2xl font-bold tracking-wide" style={{ color: "#ede9fe" }}>
              Copper<span style={{
                color: "#a78bfa",
                textShadow: "0 0 20px rgba(167,139,250,0.4)"
              }}>Jems</span>
            </h1>
          </div>

          <div style={{
            display: "inline-block",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "20px",
            padding: "3px 12px",
          }}>
            <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "#7c6fe0" }}>
              Workspace Portal
            </p>
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#6d6a9c" }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="admin@copperjems.com"
            style={{
              background: "rgba(99,102,241,0.06)",
              border: "1px solid rgba(99,102,241,0.18)",
              color: "#ddd6fe",
              outline: "none",
              transition: "all 0.2s",
              caretColor: "#a78bfa",
            }}
            className="w-full px-4 py-3 rounded-xl text-sm"
            onFocus={e => {
              e.target.style.borderColor = "rgba(167,139,250,0.6)";
              e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15), 0 0 12px rgba(99,102,241,0.1)";
              e.target.style.background = "rgba(99,102,241,0.1)";
            }}
            onBlur={e => {
              e.target.style.borderColor = "rgba(99,102,241,0.18)";
              e.target.style.boxShadow = "none";
              e.target.style.background = "rgba(99,102,241,0.06)";
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-8">
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#6d6a9c" }}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              style={{
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.18)",
                color: "#ddd6fe",
                outline: "none",
                transition: "all 0.2s",
                caretColor: "#a78bfa",
              }}
              className="w-full px-4 py-3 rounded-xl text-sm pr-12"
              onFocus={e => {
                e.target.style.borderColor = "rgba(167,139,250,0.6)";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15), 0 0 12px rgba(99,102,241,0.1)";
                e.target.style.background = "rgba(99,102,241,0.1)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "rgba(99,102,241,0.18)";
                e.target.style.boxShadow = "none";
                e.target.style.background = "rgba(99,102,241,0.06)";
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
              style={{ color: "#4c4680" }}
              onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
              onMouseLeave={e => e.currentTarget.style.color = "#4c4680"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          style={{
            background: "linear-gradient(135deg, #5b5ef4 0%, #7c6fe0 50%, #a78bfa 100%)",
            boxShadow: "0 4px 24px rgba(99,102,241,0.45), 0 0 0 1px rgba(167,139,250,0.2) inset",
            color: "#fff",
            letterSpacing: "0.06em",
          }}
          className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest"
        >
          Sign In
        </motion.button>

        {/* Bottom line */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "120px", height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
          borderRadius: "2px",
        }} />
      </motion.div>
    </div>
  );
}
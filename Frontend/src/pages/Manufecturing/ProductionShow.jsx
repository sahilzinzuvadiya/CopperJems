import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { motion } from "framer-motion";
import {
    FaIndustry,
    FaCheckCircle,
    FaUser,
    FaCubes
} from "react-icons/fa";

export default function ProductionShow() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("/production/completed").then(res => setList(res.data));
    }, []);

    return (
        <div className="min-h-screen p-4 md:p-2">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
                    <FaIndustry className="text-white text-xl" />
                </div>
                <div>
                    <h1 className="text-2xl max-sm:text-xl font-bold text-slate-800">
                        Completed Production
                    </h1>
                    <p className="text-sm text-slate-500">
                        Finished manufacturing jobs
                    </p>
                </div>
            </div>

            {/* LIST */}
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
                {list.map((p) => (
                    <motion.div
                        key={p._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        className="relative bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600"
                    >

                        {/* ⭐ TOP RIGHT BADGE */}
                        <span className="
    absolute top-4 right-4
    flex items-center gap-1
    text-xs font-semibold
    bg-green-100 text-green-700
    px-3 py-1 rounded-full
  ">
                            <FaCheckCircle size={12} />
                            Completed
                        </span>

                        {/* TITLE */}
                        <h3 className="text-lg font-semibold text-slate-800">
                            {p.wireType} Wire
                        </h3>

                        {/* RAW */}
                        <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                            <FaCubes className="text-indigo-600" />
                            Raw Used: <b>{p.rawQtyUsed}</b>
                        </p>

                        {/* OUTPUT */}
                        <p className="text-sm mt-2">
                            Output: <b>{p.outputQty}</b>
                        </p>

                        {/* EMPLOYEE */}
                        <p className="text-sm mt-3 flex items-center gap-2">
                            <FaUser className="text-gray-500" />
                            Employee: <b>{p.completedBy?.name || "Unknown"}</b>
                        </p>

                        {/* DATE */}
                        <p className="text-xs text-gray-400 mt-3">
                            {new Date(p.completedAt).toLocaleString()}
                        </p>

                    </motion.div>

                ))}
            </div>
        </div>
    );
}

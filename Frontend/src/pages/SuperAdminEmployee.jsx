import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Users } from "lucide-react";

export default function SuperAdminEmployee() {
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await axios.get("/employee/superadmin/all", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        setEmployees(res.data);
    };

    /* ================= FILTER LOGIC ================= */
    const departments = [
        "All",
        ...new Set(employees.map((e) => e.department))
    ];

    const filteredEmployees =
        filter === "All"
            ? employees
            : employees.filter((e) => e.department === filter);

    return (
        <div>
            {/* ================= HEADER ================= */}
            <div className="p-2 mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Users />
                    All Employees
                </h2>
                <p className="text-sm text-slate-500">
                    Employees across all departments
                </p>
            </div>

            {/* ================= FILTER BUTTONS ================= */}

            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {departments.map((dept) => (
                    <button
                        key={dept}
                        onClick={() => setFilter(dept)}
                        className={`
        px-6 py-2 rounded-xl text-sm font-medium transition
        shadow-lg
        ${filter === dept
                                ? "bg-indigo-600 text-white"
                                : "bg-white hover:bg-slate-50 text-slate-700"
                            }
      `}
                    >
                        {dept}
                    </button>
                ))}
            </div>


            {/* ================= EMPLOYEE GRID ================= */}

            <div className="grid md:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEmployees.map((e) => (
                    <div
                        key={e._id}
                        className="
        relative
        bg-white rounded-2xl p-5
        shadow-md hover:shadow-lg transition
        min-h-[150px]
        flex flex-col justify-between
      "
                    >
                        {/* DEPARTMENT BADGE */}
                        <span
                            className="
          absolute top-4 right-4
          text-xs font-medium
          bg-indigo-50 text-indigo-600
          px-3 py-1 rounded-full
        "
                        >
                            {e.department}
                        </span>

                        {/* INFO */}
                        <div className="flex items-center gap-4">
                            {/* AVATAR */}
                            <div
                                className="
            w-11 h-11 rounded-xl
            bg-indigo-600 text-white
            flex items-center justify-center
            font-bold text-lg
          "
                            >
                                {e.name?.charAt(0).toUpperCase()}
                            </div>

                            {/* NAME + EMAIL */}
                            <div className="leading-tight">
                                <p className="font-semibold text-slate-800">
                                    {e.name}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {e.email}
                                </p>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="mt-4 pt-3 border-t text-xs text-slate-400">
                            Created by{" "}
                            <span className="font-medium text-slate-600">
                                {e.createdBy?.email || "Super Admin"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>



            {/* EMPTY STATE */}
            {filteredEmployees.length === 0 && (
                <p className="text-center text-slate-400 mt-10">
                    No employees found
                </p>
            )}
        </div>
    );
}

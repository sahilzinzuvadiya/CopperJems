// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { Users } from "lucide-react";

// export default function SuperAdminEmployee() {
//     const [employees, setEmployees] = useState([]);
//     const [filter, setFilter] = useState("All");

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = async () => {
//         const res = await axios.get("/employee/superadmin/all", {
//             headers: {
//                 Authorization: "Bearer " + localStorage.getItem("token")
//             }
//         });
//         setEmployees(res.data);
//     };

//     /* ================= FILTER LOGIC ================= */
//     const departments = [
//         "All",
//         ...new Set(employees.map((e) => e.department))
//     ];

//     const filteredEmployees =
//         filter === "All"
//             ? employees
//             : employees.filter((e) => e.department === filter);

//     return (
//         <div>
//             {/* ================= HEADER ================= */}
//             <div className="p-2 mb-6">
//                 <h2 className="text-2xl font-bold flex items-center gap-2">
//                     <Users />
//                     All Employees
//                 </h2>
//                 <p className="text-sm text-slate-500">
//                     Employees across all departments
//                 </p>
//             </div>

//             {/* ================= FILTER BUTTONS ================= */}

//             <div className="flex flex-wrap justify-center gap-3 mb-8">
//                 {departments.map((dept) => (
//                     <button
//                         key={dept}
//                         onClick={() => setFilter(dept)}
//                         className={`
//         px-6 py-2 rounded-xl text-sm font-medium transition
//         shadow-lg
//         ${filter === dept
//                                 ? "bg-indigo-600 text-white"
//                                 : "bg-white hover:bg-slate-50 text-slate-700"
//                             }
//       `}
//                     >
//                         {dept}
//                     </button>
//                 ))}
//             </div>


//             {/* ================= EMPLOYEE GRID ================= */}

//             <div className="grid md:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredEmployees.map((e) => (
//                     <div
//                         key={e._id}
//                         className="
//         relative
//         bg-white rounded-2xl p-5
//         shadow-md hover:shadow-lg transition
//         min-h-[150px]
//         flex flex-col justify-between
//       "
//                     >
//                         {/* DEPARTMENT BADGE */}
//                         <span
//                             className="
//           absolute top-4 right-4
//           text-xs font-medium
//           bg-indigo-50 text-indigo-600
//           px-3 py-1 rounded-full
//         "
//                         >
//                             {e.department}
//                         </span>

//                         {/* INFO */}
//                         <div className="flex items-center gap-4">
//                             {/* AVATAR */}
//                             <div
//                                 className="
//             w-11 h-11 rounded-xl
//             bg-indigo-600 text-white
//             flex items-center justify-center
//             font-bold text-lg
//           "
//                             >
//                                 {e.name?.charAt(0).toUpperCase()}
//                             </div>

//                             {/* NAME + EMAIL */}
//                             <div className="leading-tight">
//                                 <p className="font-semibold text-slate-800">
//                                     {e.name}
//                                 </p>
//                                 <p className="text-sm text-slate-500">
//                                     {e.email}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* FOOTER */}
//                         <div className="mt-4 pt-3 border-t text-xs text-slate-400">
//                             Created by{" "}
//                             <span className="font-medium text-slate-600">
//                                 {e.createdBy?.email || "Super Admin"}
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>



//             {/* EMPTY STATE */}
//             {filteredEmployees.length === 0 && (
//                 <p className="text-center text-slate-400 mt-10">
//                     No employees found
//                 </p>
//             )}
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Users } from "lucide-react";

const CARD   = "rgba(22,20,48,0.95)";
const BORDER = "rgba(99,102,241,0.18)";
const TEXT1  = "#ede9fe";
const TEXT2  = "#6d6a9c";
const INDIGO = "#6366f1";
const VIOLET = "#a78bfa";

export default function SuperAdminEmployee() {
  const [employees, setEmployees] = useState([]);
  const [filter,    setFilter]    = useState("All");

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    const res = await axios.get("/employee/superadmin/all", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setEmployees(res.data);
  };

  const departments = ["All", ...new Set(employees.map((e) => e.department))];

  const filteredEmployees = filter === "All"
    ? employees
    : employees.filter((e) => e.department === filter);

  return (
    <div>

      {/* ── HEADER ── */}
      <div className="p-2 mb-6 flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
            boxShadow: `0 0 20px rgba(99,102,241,0.4)`,
          }}
        >
          <Users className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: TEXT1 }}>
            All Employees
          </h2>
          <p className="text-sm mt-1" style={{ color: TEXT2 }}>
            Employees across all departments
          </p>
        </div>
      </div>

      {/* ── FILTER BUTTONS ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {departments.map((dept) => {
          const isActive = filter === dept;
          return (
            <button
              key={dept}
              onClick={() => setFilter(dept)}
              className="px-6 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, rgba(99,102,241,0.35), rgba(167,139,250,0.25))`
                  : "rgba(99,102,241,0.05)",
                border: isActive
                  ? `1px solid rgba(99,102,241,0.5)`
                  : `1px solid ${BORDER}`,
                color: isActive ? TEXT1 : TEXT2,
                boxShadow: isActive ? `0 0 12px rgba(99,102,241,0.2)` : "none",
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(99,102,241,0.12)";
                  e.currentTarget.style.color = "#c4b5fd";
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(99,102,241,0.05)";
                  e.currentTarget.style.color = TEXT2;
                }
              }}
            >
              {dept}
            </button>
          );
        })}
      </div>

      {/* ── EMPLOYEE GRID ── */}
      <div className="grid md:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredEmployees.map((e) => (
          <div
            key={e._id}
            className="relative flex flex-col justify-between p-5 rounded-2xl transition-all"
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              minHeight: "150px",
            }}
            onMouseEnter={el => el.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.15)"}
            onMouseLeave={el => el.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"}
          >
            {/* Department badge */}
            <span
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "rgba(99,102,241,0.15)",
                border: `1px solid rgba(99,102,241,0.3)`,
                color: VIOLET,
              }}
            >
              {e.department}
            </span>

            {/* Info */}
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`,
                  boxShadow: `0 0 14px rgba(99,102,241,0.35)`,
                }}
              >
                {e.name?.charAt(0).toUpperCase()}
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-sm" style={{ color: TEXT1 }}>
                  {e.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: TEXT2 }}>
                  {e.email}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div
              className="mt-4 pt-3 text-xs"
              style={{ borderTop: `1px solid ${BORDER}`, color: TEXT2 }}
            >
              Created by{" "}
              <span className="font-medium" style={{ color: VIOLET }}>
                {e.createdBy?.email || "Super Admin"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredEmployees.length === 0 && (
        <p className="text-center mt-10 text-sm" style={{ color: TEXT2 }}>
          No employees found
        </p>
      )}
    </div>
  );
}
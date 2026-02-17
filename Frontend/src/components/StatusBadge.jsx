export default function StatusBadge({ status }) {
  const colors = {
    PR_CREATED: "bg-yellow-100 text-yellow-700",
    ADMIN_APPROVED: "bg-blue-100 text-blue-700",
    SUPERADMIN_APPROVED: "bg-indigo-100 text-indigo-700",
    PAYMENT_DONE: "bg-green-100 text-green-700",
    MATERIAL_RECEIVED: "bg-emerald-100 text-emerald-700",
    REJECTED: "bg-red-100 text-red-700"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}

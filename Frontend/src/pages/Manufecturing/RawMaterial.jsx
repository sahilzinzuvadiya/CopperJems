import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaBoxes } from "react-icons/fa";

export default function RawMaterial() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("/grn/raw-materials");
      setMaterials(res.data);
    } catch {
      console.log("failed");
    }
  };

  return (
    <div className="p-2">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <FaBoxes className="text-indigo-600 text-2xl" />
        <h1 className="text-2xl font-bold">Raw Material Status</h1>
      </div>

      {materials.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No raw material received yet
        </p>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {materials.map((m) => {
          const received = m.quantityReceived || 0;
          const percent = ((received / m.quantity) * 100).toFixed(1);
          const isFull = received >= m.quantity;

          return (
            <div
              key={m._id}
              className="relative bg-white rounded-xl shadow p-5"
            >
              {/* 🔷 TOP RIGHT BADGE */}
              {isFull && (
                <span className="
                  absolute top-3 right-3
                  bg-green-600 text-white
                  text-xs px-3 py-1 rounded-full
                  shadow
                ">
                  FULLY RECEIVED
                </span>
              )}

              <h3 className="font-semibold text-lg">
                {m.materialName}
              </h3>

              <p className="text-sm mt-2">
                Ordered: <b>{m.quantity}</b>
              </p>

              <p className="text-sm text-green-600">
                Received: <b>{received}</b>
              </p>

              <p className="text-sm">
                Completion: <b>{percent}%</b>
              </p>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-200 h-2 rounded mt-3">
                <div
                  className={`h-2 rounded ${
                    isFull ? "bg-green-600" : "bg-indigo-600"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

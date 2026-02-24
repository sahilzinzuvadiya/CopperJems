import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Employee from "./pages/Employee";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/superadmin"
          element={
            <ProtectedRoute>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<Employee />} />
        


      </Routes>
    </BrowserRouter>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../admin/AdminLogin";
import Dashboard from "../admin/Dashboard";
import AddProperty from "../admin/AddProperty";
import EditProperty from "../admin/EditProperty";


const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <RequireAuth>
            <EditProperty />
          </RequireAuth>
        }
      />


      <Route
        path="/add"
        element={
          <RequireAuth>
            <AddProperty />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

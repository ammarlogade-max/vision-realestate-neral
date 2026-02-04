import { Navigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function AdminLayout({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP BAR */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Vision RealEstate Admin</h1>
        <LogoutButton />
      </header>

      {/* PAGE CONTENT */}
      <main>{children}</main>
    </div>
  );
}

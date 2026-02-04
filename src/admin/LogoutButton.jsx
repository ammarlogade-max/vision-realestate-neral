import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <ConfirmModal
        open={open}
        title="Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

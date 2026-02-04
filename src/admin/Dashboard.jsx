import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllProperties,
  deleteProperty,
  markPropertySold,
} from "../services/propertyAdminApi";
import LogoutButton from "./LogoutButton";
import Toast from "../components/Toast";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  const loadProperties = async () => {
    try {
      const data = await fetchAllProperties();
      setProperties(data);
    } catch (err) {
      setToast({ message: "Failed to load properties", type: "error" });
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(properties.length / PAGE_SIZE));
    if (page > totalPages) setPage(totalPages);
  }, [properties, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;
    try {
      await deleteProperty(id);
      setToast({ message: "Property deleted", type: "success" });
      loadProperties();
    } catch (err) {
      setToast({ message: "Failed to delete property", type: "error" });
    }
  };

  const handleSold = async (id) => {
    try {
      await markPropertySold(id);
      setToast({ message: "Property marked as sold", type: "success" });
      loadProperties();
    } catch (err) {
      setToast({ message: "Failed to mark as sold", type: "error" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/add")}
              className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
            >
              + Add Property
            </button>
            <LogoutButton />
          </div>
        </div>

        {/* LIST */}
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <>
            {Math.ceil(properties.length / PAGE_SIZE) > 1 && (
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing {(page - 1) * PAGE_SIZE + 1}-
                  {Math.min(page * PAGE_SIZE, properties.length)} of{" "}
                  {properties.length}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() =>
                      setPage((p) =>
                        Math.min(
                          Math.ceil(properties.length / PAGE_SIZE),
                          p + 1
                        )
                      )
                    }
                    disabled={page >= Math.ceil(properties.length / PAGE_SIZE)}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {properties
                .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                .map((p) => (
              <div
                key={p._id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <h2 className="font-semibold">{p.title}</h2>
                  <p className="text-sm text-gray-600">
                    {p.category} - {p.status}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/edit/${p._id}`)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleSold(p._id)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                  >
                    Mark Sold
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

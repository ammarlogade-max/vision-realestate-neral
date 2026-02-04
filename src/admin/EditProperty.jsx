import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById, updateProperty } from "../services/propertyAdminApi";
import Toast from "../components/Toast";

const API_BASE = "http://localhost:5000";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const MAX_SIZE_BYTES = 5 * 1024 * 1024;

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
    status: "AVAILABLE",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPropertyById(id, token);
        setForm(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load property");
      }
    };
    load();
  }, [id, token]);

  if (loading) return <p className="p-6">Loading...</p>;

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "images") fd.append(key, value);
    });

    newImages.forEach((img) => fd.append("images", img));

    try {
      await updateProperty(id, fd, token);
      setToast({ message: "Property updated successfully", type: "success" });
      navigate("/admin/dashboard");
    } catch (err) {
      setToast({ message: "Failed to update property", type: "error" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold">Edit Property</h1>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <select
            className="w-full border rounded px-3 py-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="SHOP">Commercial Shop</option>
            <option value="VILLA">Villa</option>
            <option value="PLOT">Plot</option>
          </select>

          <select
            className="w-full border rounded px-3 py-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
            <option value="RESERVED">Reserved</option>
          </select>

          {Array.isArray(form.images) &&
            form.images.filter(
              (img) =>
                img &&
                !img.startsWith("http://localhost") &&
                !img.startsWith("http://127.0.0.1")
            ).length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {form.images
                .filter(
                  (img) =>
                    img &&
                    !img.startsWith("http://localhost") &&
                    !img.startsWith("http://127.0.0.1")
                )
                .map((img, i) => (
                <img
                  key={`${img}-${i}`}
                  src={img?.startsWith("http") ? img : `${API_BASE}${img}`}
                  alt="Property"
                  className="h-20 w-full object-cover rounded"
                />
              ))}
            </div>
          )}

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              const invalidType = files.find(
                (f) => !ALLOWED_TYPES.includes(f.type)
              );
              if (invalidType) {
                setToast({
                  message: "Images only (jpg, png, webp).",
                  type: "error",
                });
                return;
              }

              const tooLarge = files.find((f) => f.size > MAX_SIZE_BYTES);
              if (tooLarge) {
                setToast({
                  message: "Each image must be 5MB or less.",
                  type: "error",
                });
                return;
              }

              setNewImages(files);
            }}
          />

          <button className="bg-black text-white px-4 py-2 rounded">
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
}

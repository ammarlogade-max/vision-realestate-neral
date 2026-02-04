import { useState } from "react";
import { createProperty } from "../services/propertyAdminApi";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function AddProperty() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const MAX_SIZE_BYTES = 5 * 1024 * 1024;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "1BHK",
    status: "AVAILABLE",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const invalidType = files.find((f) => !ALLOWED_TYPES.includes(f.type));
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

    setImages((prev) => [...prev, ...files]);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await createProperty(formData, token);
      setToast({ message: "Property created successfully", type: "success" });
      navigate("/admin/dashboard");
    } catch (err) {
      setToast({ message: "Failed to add property", type: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Add Property</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Title" required onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <textarea name="description" placeholder="Description" required onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <input name="price" placeholder="Price" required onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <input name="location" placeholder="Location" required onChange={handleChange} className="w-full border rounded px-3 py-2" />

          <select name="category" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="SHOP">Commercial Shop</option>
            <option value="VILLA">Villa</option>
            <option value="PLOT">Plot</option>
          </select>

          <select name="status" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
            <option value="RESERVED">Reserved</option>
          </select>

          <input
            type="file"
             multiple
           accept="image/*"
           onChange={handleImageChange}
            />


          <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded font-semibold">
            {loading ? "Saving..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}

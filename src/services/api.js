export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const fetchProperties = async () => {
  const res = await fetch(`${API_BASE_URL}/api/properties`);
  return res.json();
};


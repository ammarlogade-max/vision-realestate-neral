const API_URL = `${
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
}/api/admin`;

export async function adminLogin({ email, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  // ✅ MUST be before redirect
  localStorage.setItem("adminToken", data.token);

  return data;
}

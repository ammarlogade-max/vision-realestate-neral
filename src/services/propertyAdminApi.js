const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * =========================
 * FETCH ALL PROPERTIES (ADMIN)
 * =========================
 */
export async function fetchAllProperties() {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_BASE}/api/properties/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}


/**
 * =========================
 * FETCH SINGLE PROPERTY (ADMIN)
 * =========================
 */
export const fetchPropertyById = async (id, token) => {
  const res = await fetch(`${API_BASE}/api/properties/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }

  return res.json();
};

/**
 * =========================
 * CREATE PROPERTY (ADMIN)
 * =========================
 */
export const createProperty = async (formData, token) => {
  console.log("🟢 TOKEN SENT:", token);

  const res = await fetch(`${API_BASE}/api/properties/admin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
};



/**
 * =========================
 * UPDATE PROPERTY (ADMIN)
 * =========================
 */
export const updateProperty = async (id, formData, token) => {
  const res = await fetch(`${API_BASE}/api/properties/admin/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update property");
  }

  return res.json();
};

/**
 * =========================
 * DELETE PROPERTY (ADMIN)
 * =========================
 */
export const deleteProperty = async (id, token) => {
  const authToken = token || localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/properties/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete property");
  }

  return res.json();
};

/**
 * =========================
 * MARK PROPERTY AS SOLD (ADMIN)
 * =========================
 */
export const markPropertySold = async (id, token) => {
  const authToken = token || localStorage.getItem("adminToken");
  const res = await fetch(`${API_BASE}/api/properties/admin/${id}/sold`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to mark property as sold");
  }

  return res.json();
};

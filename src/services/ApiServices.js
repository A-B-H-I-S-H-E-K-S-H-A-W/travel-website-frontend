export const updateAdmin = async (formData, token) => {
  try {
    const res = await fetch("/api/admin/update", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text(); // fallback if not JSON
      throw new Error(`Request failed: ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Verify Admin Error:", error);
    return { success: false, message: error.message };
  }
};

export const fetchAdminId = async (paramId) => {
  const token = localStorage.getItem("adminToken"); // or your token key

  const res = await fetch(`/api/admin/profile/${paramId}`, {
    method: "GET", // should be GET, not POST!
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // required by many backends
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch admin: ${res.status}`);
  }

  const data = await res.json(); // Will now work as backend returns JSON
  return data;
};

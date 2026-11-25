const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ========================================
// GET MY PROFILE
// ========================================
export async function getMyProfile() {
  const response = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to fetch profile");
    error.status = response.status;
    throw error;
  }

  return data;
}

// ========================================
// UPDATE MY PROFILE
// ========================================
export async function updateMyProfile(profileData) {
  const response = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to update profile");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
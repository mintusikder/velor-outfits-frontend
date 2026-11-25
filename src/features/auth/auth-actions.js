
"use client";

import { authClient } from "@/lib/auth-client";

// Register new user
export async function registerUser({ name, email, password }) {
  const result = await authClient.signUp.email({
    name,
    email,
    password,
  });

  return result;
}

// Login existing user
export async function loginUser({ email, password }) {
  const result = await authClient.signIn.email({
    email,
    password,
  });

  return result;
}

// Logout current user
export async function logoutUser() {
  const result = await authClient.signOut();

  return result;
}

// Get current session
export async function getCurrentSession() {
  const result = await authClient.getSession();

  return result;
}

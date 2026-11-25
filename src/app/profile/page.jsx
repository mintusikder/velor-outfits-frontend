"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Package,
  LogOut,
  Pencil,
  Save,
  X,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useSession } from "@/lib/auth-client";
import { logoutUser } from "@/features/auth/auth-actions";
import {
  getMyProfile,
  updateMyProfile,
} from "@/services/user-service";

// ========================================
// HELPER: MEMBER DATE
// ========================================
function formatDate(date) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ========================================
// PROFILE CONTENT
// ========================================
function ProfileContent() {
  const router = useRouter();

  // Better Auth session (for supplementary account metadata)
  const { data: session } = useSession();

  // Profile API states
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ========================================
  // LOAD PROFILE FROM BACKEND
  // ========================================
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await getMyProfile();

        if (!isMounted) return;

        const user = response.user;

        setProfile(user);

        setFormData({
          name: user.name || "",
          phone: user.phone || "",
          address: user.address || "",
        });
      } catch (err) {
        if (!isMounted) return;

        console.error("Profile loading error:", err);

        if (err.status === 401) {
          router.replace("/login");
          return;
        }

        setError(err.message || "Failed to load profile.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // ========================================
  // FORM INPUT CHANGE
  // ========================================
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ========================================
  // EDIT PROFILE
  // ========================================
  function handleEdit() {
    setError("");
    setSuccess("");

    setFormData({
      name: profile?.name || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
    });

    setIsEditing(true);
  }

  // ========================================
  // CANCEL EDIT
  // ========================================
  function handleCancel() {
    setFormData({
      name: profile?.name || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
    });

    setIsEditing(false);
    setError("");
    setSuccess("");
  }

  // ========================================
  // SAVE PROFILE
  // ========================================
  async function handleSave(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateMyProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      });

      setProfile(response.user);

      setFormData({
        name: response.user.name || "",
        phone: response.user.phone || "",
        address: response.user.address || "",
      });

      setIsEditing(false);
      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);

      if (err.status === 401) {
        router.replace("/login");
        return;
      }

      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  // ========================================
  // LOGOUT
  // ========================================
  async function handleLogout() {
    try {
      setLoggingOut(true);

      await logoutUser();

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  // ========================================
  // LOADING STATE
  // ========================================
  if (loading) {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            size={32}
            className="animate-spin text-[#9b805e]"
          />
          <p className="text-sm text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // ERROR STATE
  // ========================================
  if (!profile && error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <AlertCircle className="mx-auto mb-3 text-red-500" size={30} />

          <h2 className="font-semibold text-gray-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // PROFILE DATA
  // ========================================
  const initials =
    profile?.name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const emailVerified =
    session?.user?.emailVerified ?? false;

  const memberSince =
    session?.user?.createdAt || null;

  // ========================================
  // UI
  // ========================================
  return (
    <main className="w-full bg-[#f5f3ee] px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl">

        {/* PAGE HEADER */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b805e]">
            VELOR OUTFITS
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#171715] sm:text-3xl">
            My Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* ACCOUNT CARD */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* IDENTITY SECTION */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:p-7">

            {/* AVATAR */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e9e1d5] text-xl font-semibold text-[#80694c]">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            {/* USER INFO */}
            <div className="min-w-0 flex-1">
              <h2 className="break-words text-xl font-semibold text-[#171715]">
                {profile.name}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {profile.email}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  <ShieldCheck size={13} />
                  {profile.role || "user"}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    emailVerified
                      ? "bg-blue-50 text-blue-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {emailVerified
                    ? "Email Verified"
                    : "Email Not Verified"}
                </span>
              </div>
            </div>

            {/* EDIT BUTTON */}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            )}
          </div>

          {/* PROFILE INFORMATION */}
          <div className="p-5 sm:p-7">

            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#171715]">
                Personal Information
              </h3>

              {isEditing && (
                <span className="text-xs text-[#9b805e]">
                  Editing mode
                </span>
              )}
            </div>

            {/* EDIT FORM */}
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-5">

                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={100}
                      className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#9b805e] focus:ring-2 focus:ring-[#9b805e]/10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={30}
                      className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#9b805e] focus:ring-2 focus:ring-[#9b805e]/10"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-4 text-gray-400"
                    />

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      maxLength={500}
                      rows={3}
                      className="w-full resize-y rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#9b805e] focus:ring-2 focus:ring-[#9b805e]/10"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#171715] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* VIEW MODE */
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* NAME */}
                <div className="rounded-xl bg-[#f8f7f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-gray-400">
                    <UserRound size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Full Name
                    </span>
                  </div>

                  <p className="break-words text-sm font-medium text-gray-800">
                    {profile.name || "Not provided"}
                  </p>
                </div>

                {/* EMAIL */}
                <div className="rounded-xl bg-[#f8f7f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-gray-400">
                    <Mail size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Email Address
                    </span>
                  </div>

                  <p className="break-all text-sm font-medium text-gray-800">
                    {profile.email || "Not provided"}
                  </p>
                </div>

                {/* PHONE */}
                <div className="rounded-xl bg-[#f8f7f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-gray-400">
                    <Phone size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Phone Number
                    </span>
                  </div>

                  <p className="break-words text-sm font-medium text-gray-800">
                    {profile.phone || "Not provided"}
                  </p>
                </div>

                {/* ADDRESS */}
                <div className="rounded-xl bg-[#f8f7f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Address
                    </span>
                  </div>

                  <p className="break-words whitespace-pre-wrap text-sm font-medium text-gray-800">
                    {profile.address || "Not provided"}
                  </p>
                </div>

                {/* MEMBER SINCE */}
                <div className="rounded-xl bg-[#f8f7f4] p-4 sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-gray-400">
                    <ShieldCheck size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Member Since
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-800">
                    {formatDate(memberSince)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ACCOUNT ACTIONS */}
          <div className="border-t border-gray-100 bg-[#fafaf9] p-5 sm:p-7">
            <h3 className="mb-4 text-base font-semibold text-[#171715]">
              Account Actions
            </h3>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* MY ORDERS */}
              <Link
                href="/orders"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Package size={17} />
                My Orders
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-100 bg-white px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                {loggingOut ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <LogOut size={17} />
                )}

                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-4 text-center text-xs leading-5 text-gray-400">
          Your personal information is securely managed by VELOR OUTFITS.
        </p>
      </div>
    </main>
  );
}

// ========================================
// PAGE COMPONENT
// ========================================
export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
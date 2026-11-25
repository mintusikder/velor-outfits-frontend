
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useSession } from "@/lib/auth-client";
import { logoutUser } from "@/features/auth/auth-actions";

import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  LogOut,
  LoaderCircle,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

// Format account creation date
function formatDate(dateValue) {
  if (!dateValue) return "Not available";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Generate user initials
function getInitials(name) {
  if (!name) return "U";

  return name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  // Logout
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      setLogoutError("");

      const result = await logoutUser();

      if (result?.error) {
        throw new Error(result.error.message || "Logout failed");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Profile logout error:", error);

      setLogoutError(
        error.message || "Unable to logout. Please try again."
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  // Loading State
  if (isPending) {
    return (
      <main className="bg-[#f7f7f5] px-4 py-12">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <LoaderCircle size={18} className="animate-spin" />
          Loading account...
        </div>
      </main>
    );
  }

  // Guest State
  if (!user) {
    return (
      <main className="bg-[#f7f7f5] px-4 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-[#eae7e1] bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eee9e1] text-[#826b4d]">
            <UserRound size={24} />
          </div>

          <h1 className="text-xl font-semibold text-[#171715]">
            Sign in to your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please login to view your account information.
          </p>

          <Link
            href="/login"
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#171715] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#343430]"
          >
            Login to Continue
          </Link>

          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-black"
          >
            Back to Home
            <ChevronRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  const initials = getInitials(user.name);

  return (
    <main className="bg-[#f7f7f5] px-3 py-4 sm:px-5 sm:py-6">
      <div className="mx-auto w-full max-w-3xl">

        {/* Page Heading */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9b805e]">
            MY ACCOUNT
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#171715] sm:text-3xl">
            My Account
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Account overview · Profile information
          </p>
        </div>

        {/* Main Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-[#eae7e1] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.035)]">

          {/* User Identity */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eee9e1] text-lg font-bold text-[#826b4d] sm:h-16 sm:w-16 sm:text-xl">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              {/* User Details */}
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-[#171715] sm:text-xl">
                  {user.name || "User"}
                </h2>

                <p className="mt-0.5 break-all text-xs text-gray-500 sm:text-sm">
                  {user.email}
                </p>

                {/* Account Badge */}
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-green-700 sm:text-xs">
                  <ShieldCheck size={13} />

                  {user.emailVerified
                    ? "Verified account"
                    : "Account"}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-4 border-t border-gray-100 sm:mx-5" />

          {/* Account Information */}
          <div className="p-4 sm:p-5">
            <h3 className="mb-3 text-sm font-semibold text-[#171715] sm:text-base">
              Account Information
            </h3>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">

              {/* Full Name */}
              <div className="rounded-xl bg-[#f8f8f7] p-3 transition hover:bg-[#f3f2ef]">
                <div className="mb-2 flex items-center gap-1.5 text-gray-400">
                  <UserRound size={14} />

                  <span className="text-[9px] font-semibold uppercase tracking-wider sm:text-[10px]">
                    Full Name
                  </span>
                </div>

                <p className="break-words text-xs font-semibold text-[#171715] sm:text-sm">
                  {user.name || "Not available"}
                </p>
              </div>

              {/* Email Address */}
              <div className="rounded-xl bg-[#f8f8f7] p-3 transition hover:bg-[#f3f2ef]">
                <div className="mb-2 flex items-center gap-1.5 text-gray-400">
                  <Mail size={14} />

                  <span className="text-[9px] font-semibold uppercase tracking-wider sm:text-[10px]">
                    Email Address
                  </span>
                </div>

                <p className="break-all text-xs font-semibold text-[#171715] sm:text-sm">
                  {user.email || "Not available"}
                </p>
              </div>

              {/* Account Status */}
              <div className="rounded-xl bg-[#f8f8f7] p-3 transition hover:bg-[#f3f2ef]">
                <div className="mb-2 flex items-center gap-1.5 text-gray-400">
                  <ShieldCheck size={14} />

                  <span className="text-[9px] font-semibold uppercase tracking-wider sm:text-[10px]">
                    Account Status
                  </span>
                </div>

                <p className="flex items-center gap-1.5 text-xs font-semibold text-green-700 sm:text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Active
                </p>
              </div>

              {/* Member Since */}
              <div className="rounded-xl bg-[#f8f8f7] p-3 transition hover:bg-[#f3f2ef]">
                <div className="mb-2 flex items-center gap-1.5 text-gray-400">
                  <CalendarDays size={14} />

                  <span className="text-[9px] font-semibold uppercase tracking-wider sm:text-[10px]">
                    Member Since
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#171715] sm:text-sm">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="mx-4 border-t border-gray-100 sm:mx-5" />

          <div className="p-4 sm:p-5">
            <h3 className="mb-3 text-sm font-semibold text-[#171715]">
              Account Actions
            </h3>

            <div className="grid grid-cols-2 gap-2.5">

              {/* My Orders */}
              <Link
                href="/my-orders"
                className="group flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-xs font-semibold text-[#171715] transition hover:border-[#c6a77b] hover:bg-[#faf9f7] sm:text-sm"
              >
                <ShoppingBag size={16} />

                My Orders

                <ChevronRight
                  size={14}
                  className="hidden transition group-hover:translate-x-0.5 sm:block"
                />
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-100 px-3 py-3 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
              >
                {logoutLoading ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <LogOut size={16} />
                )}

                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            </div>

            {/* Logout Error */}
            {logoutError && (
              <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                {logoutError}
              </div>
            )}
          </div>
        </section>

        {/* Page Footer Note */}
        <p className="mt-3 text-center text-[10px] text-gray-400">
          VELOR OUTFITS · Your account information
        </p>
      </div>
    </main>
  );
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import { loginUser } from "@/features/auth/auth-actions";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  // Handle Login
  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      if (result?.error) {
        setError(
          result.error.message || "Invalid email or password."
        );
        return;
      }

      // Successful Login
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="WELCOME BACK TO VELOR"
      title="Welcome back."
      description="Sign in to your VELOR account and continue discovering your personal style."
      footerText=""
      footerLinkText=""
      footerHref="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold text-[#343434]"
          >
            Email Address
          </label>

          <div className="flex items-center rounded-lg border border-gray-200 transition focus-within:border-[#9b805e] focus-within:ring-2 focus-within:ring-[#c6a77b]/10">
            <Mail
              className="ml-3.5 shrink-0 text-gray-400"
              size={17}
            />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full min-w-0 bg-transparent py-3 pl-3 pr-3 text-sm text-[#171715] outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-[#343434]"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[#927653] transition hover:text-black"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center rounded-lg border border-gray-200 transition focus-within:border-[#9b805e] focus-within:ring-2 focus-within:ring-[#c6a77b]/10">
            <LockKeyhole
              className="ml-3.5 shrink-0 text-gray-400"
              size={17}
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="w-full min-w-0 bg-transparent py-3 pl-3 pr-3 text-sm text-[#171715] outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="mr-3.5 shrink-0 text-gray-400 transition hover:text-black"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>
        </div>

        {/* Login Error */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-600"
          >
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#171715] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#38352f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}

          {!loading && (
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </button>

        {/* Register Link */}
        <div className="border-t border-gray-100 pt-4 text-center">
          <p className="text-sm text-gray-500">
            New to VELOR?{" "}
            <Link
              href="/register"
              className="inline-flex items-center gap-1 font-semibold text-[#171715] underline decoration-[#c6a77b] underline-offset-4 transition hover:text-[#9b805e]"
            >
              Create an account
              <ArrowUpRight size={14} />
            </Link>
          </p>
        </div>

      </form>
    </AuthLayout>
  );
}

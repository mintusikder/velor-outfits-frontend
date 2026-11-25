
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import { registerUser } from "@/features/auth/auth-actions";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (result?.error) {
        setError(
          result.error.message || "Registration failed. Please try again."
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full min-w-0 bg-transparent py-2.5 pl-10 pr-10 text-sm text-[#171715] outline-none placeholder:text-gray-400";

  return (
    <AuthLayout
      eyebrow="JOIN THE VELOR COMMUNITY"
      title="Create your account"
      description="Join VELOR and discover a better way to dress."
    >
      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-semibold text-[#343434]"
          >
            Full Name
          </label>

          <div className="flex items-center rounded-lg border border-gray-200 transition focus-within:border-[#9b805e] focus-within:ring-2 focus-within:ring-[#c6a77b]/10">
            <UserRound className="ml-3.5 shrink-0 text-gray-400" size={17} />

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold text-[#343434]"
          >
            Email Address
          </label>

          <div className="flex items-center rounded-lg border border-gray-200 transition focus-within:border-[#9b805e] focus-within:ring-2 focus-within:ring-[#c6a77b]/10">
            <Mail className="ml-3.5 shrink-0 text-gray-400" size={17} />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-semibold text-[#343434]"
          >
            Password
          </label>

          <div className="flex items-center rounded-lg border border-gray-200 transition focus-within:border-[#9b805e] focus-within:ring-2 focus-within:ring-[#c6a77b]/10">
            <LockKeyhole className="ml-3.5 shrink-0 text-gray-400" size={17} />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mr-3.5 shrink-0 text-gray-400 transition hover:text-black"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-xs font-semibold text-[#343434]"
          >
            Confirm Password
          </label>

          <div className="flex items-center rounded-lg border border-gray-200 transition focus-within:border-[#9b805e] focus-within:ring-2 focus-within:ring-[#c6a77b]/10">
            <LockKeyhole className="ml-3.5 shrink-0 text-gray-400" size={17} />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="mr-3.5 shrink-0 text-gray-400 transition hover:text-black"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-[11px] leading-5 text-gray-500">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#171715]"
          />

          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-semibold text-[#171715] underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[#171715] underline"
            >
              Privacy Policy
            </Link>.
          </span>
        </label>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#171715] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#38352f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}

          {!loading && (
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </button>

        {/* Login Link */}
        <div className="border-t border-gray-100 pt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 font-semibold text-[#171715] underline decoration-[#c6a77b] underline-offset-4 transition hover:text-[#9b805e]"
            >
              Sign in
              <ArrowUpRight size={14} />
            </Link>
          </p>
        </div>

      </form>
    </AuthLayout>
  );
}

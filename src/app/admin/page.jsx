
"use client";

import AdminRoute from "@/components/auth/AdminRoute";
import { ShieldCheck, LayoutDashboard } from "lucide-react";

export default function AdminPage() {
  return (
    <AdminRoute>
      <main className="min-h-screen bg-[#f7f7f5] px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f0e8]">
              <ShieldCheck className="text-green-700" size={26} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b805e]">
              VELOR OUTFITS
            </p>

            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-gray-500">
              Welcome to the VELOR OUTFITS admin panel.
              Your administrator access is verified.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Products",
                value: "0",
              },
              {
                title: "Orders",
                value: "0",
              },
              {
                title: "Customers",
                value: "0",
              },
              {
                title: "Revenue",
                value: "৳0",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {item.value}
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                  Dashboard preview
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <LayoutDashboard
              size={34}
              className="mx-auto mb-3 text-[#9b805e]"
            />

            <h2 className="text-lg font-semibold text-gray-900">
              Admin protection is active
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              This page is currently protected by AdminRoute.
              Product and order management will be added in later phases.
            </p>
          </div>
        </div>
      </main>
    </AdminRoute>
  );
}

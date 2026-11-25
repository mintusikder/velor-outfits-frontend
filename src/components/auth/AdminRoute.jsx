
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { LoaderCircle, ShieldCheck, LockKeyhole } from "lucide-react";

export default function AdminRoute({ children }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const role = user?.role;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
      return;
    }

    if (!isPending && user && role !== "admin") {
      router.replace("/");
    }
  }, [isPending, user, role, router]);

  // Session loading
  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f5] px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <LoaderCircle
              size={24}
              className="animate-spin text-[#9b805e]"
            />
          </div>

          <p className="text-sm text-gray-500">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f5] px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <ShieldCheck size={26} className="text-[#9b805e]" />

          <p className="text-sm text-gray-500">
            Redirecting to login...
          </p>
        </div>
      </main>
    );
  }

  // Logged in, but not an admin
  if (role !== "admin") {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f5] px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <LockKeyhole size={22} className="text-red-500" />
          </div>

          <p className="text-sm text-gray-500">
            Access denied. Redirecting...
          </p>
        </div>
      </main>
    );
  }

  // Admin authenticated
  return children;
}

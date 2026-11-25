
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { LoaderCircle, ShieldCheck } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  // Session loading
  if (isPending || !user) {
    return (
      <main className="flex min-h-[250px] items-center justify-center bg-[#f7f7f5] px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            {isPending ? (
              <LoaderCircle
                size={22}
                className="animate-spin text-[#9b805e]"
              />
            ) : (
              <ShieldCheck size={22} className="text-[#9b805e]" />
            )}
          </div>

          <p className="text-sm text-gray-500">
            {isPending
              ? "Checking your account..."
              : "Redirecting to login..."}
          </p>
        </div>
      </main>
    );
  }

  // Authenticated user
  return children;
}

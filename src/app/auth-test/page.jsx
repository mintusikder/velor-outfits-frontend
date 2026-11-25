
"use client";

import { useSession } from "@/lib/auth-client";

export default function AuthTestPage() {
  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Checking authentication session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full rounded-2xl border p-6 space-y-4">
        <h1 className="text-2xl font-bold">
          Better Auth Connection Test
        </h1>

        {error ? (
          <div className="text-red-600">
            <h2 className="font-semibold">Connection Error</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        ) : session ? (
          <div className="text-green-700 space-y-2">
            <h2 className="font-semibold">
              Authenticated Successfully!
            </h2>

            <p>
              User: {session.user.name}
            </p>

            <p>
              Email: {session.user.email}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-green-700 font-medium">
              Better Auth API connection appears successful.
            </p>

            <p className="text-gray-500">
              You are currently not logged in.
            </p>
          </div>
        )}

        <details>
          <summary className="cursor-pointer">
            Session response
          </summary>

          <pre className="mt-3 overflow-auto text-xs">
            {JSON.stringify(session, null, 2)}
          </pre>
        </details>
      </div>
    </main>
  );
}


import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <main className="w-full bg-[#f5f3ee] px-3 pt-4 pb-5 sm:px-6 sm:pt-6 sm:pb-6">
      <div className="mx-auto w-full max-w-[460px] rounded-2xl bg-white px-5 py-5 shadow-[0_10px_50px_rgba(0,0,0,0.06)] sm:px-10 sm:py-7 md:px-12">

        {/* Logo */}
        {/* <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-black tracking-[0.2em] text-[#171715]"
          >
            VELOR.
          </Link>

          <span className="text-[10px] font-medium tracking-[0.25em] text-gray-400">
            MENSWEAR
          </span>
        </div> */}

        {/* Heading */}
        <div className="mb-5">
          {/* <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f0e9] text-[#8c7354]">
            <ShieldCheck size={20} />
          </div>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9b805e]">
            {eyebrow}
          </p> */}

          <h1 className="text-3xl font-semibold tracking-tight text-[#171715] sm:text-4xl">
            {title}
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>

        {/* Form */}
        {children}

      </div>
    </main>
  );
}

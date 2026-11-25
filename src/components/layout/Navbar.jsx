
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
  ChevronDown,
  User,
  Package,
  LogOut,
  LoaderCircle,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { logoutUser } from "@/features/auth/auth-actions";

const links = [
  { label: "Shop", href: "/shirts" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const accountRef = useRef(null);

  // Close menus with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setAccountOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Logout
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      setLogoutError("");

      const result = await logoutUser();

      if (result?.error) {
        throw new Error(result.error.message || "Logout failed");
      }

      setAccountOpen(false);
      setMenuOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      setLogoutError(
        error.message || "Unable to logout. Please try again."
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  // User initials
  const userInitials = user?.name
    ? user.name
        .trim()
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <nav className="relative z-50 border-b border-white/15 bg-[#087BC1] text-white">

      {/* Main Navbar */}
      <div className="relative mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-3 sm:h-[76px] sm:px-5 md:px-10">

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-wider text-white/90 transition-colors duration-300 hover:text-[#FFE500]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setAccountOpen(false);
          }}
          className="relative z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Brand Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-center"
        >
          <span className="block text-[22px] font-black tracking-[-0.08em] sm:text-2xl">
            VELOR
          </span>

          <span className="block text-[7px] font-semibold tracking-[0.42em] sm:text-[8px]">
            OUTFITS
          </span>
        </Link>

        {/* Right Icons */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 hover:text-[#FFE500]"
          >
            <Search size={18} />
          </button>

          {/* Account */}
          <div ref={accountRef} className="relative">

            {/* Session Loading */}
            {isPending ? (
              <div className="flex h-9 w-9 items-center justify-center">
                <LoaderCircle size={18} className="animate-spin" />
              </div>
            ) : user ? (
              <>
                {/* Logged In Account Button */}
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen((prev) => !prev);
                    setMenuOpen(false);
                  }}
                  aria-label="User account menu"
                  aria-expanded={accountOpen}
                  className="flex items-center gap-1 rounded-full transition hover:text-[#FFE500] sm:gap-1.5"
                >
                  {/* Avatar */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white text-[11px] font-bold text-[#087BC1] sm:h-9 sm:w-9 sm:text-xs">
                    {userInitials}
                  </span>

                  {/* Username - desktop/tablet only */}
                  <span className="hidden max-w-[100px] truncate text-xs font-semibold sm:block">
                    {user.name?.split(" ")[0]}
                  </span>

                  {/* Dropdown Arrow */}
                  <ChevronDown
                    size={14}
                    className={`hidden transition-transform sm:block ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                        scale: 0.97,
                      }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-[min(260px,calc(100vw-16px))] overflow-hidden rounded-xl border border-gray-100 bg-white text-[#171715] shadow-xl sm:mt-3"
                    >
                      {/* User Information */}
                      <div className="border-b border-gray-100 px-4 py-3.5">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>

                      {/* Dropdown Links */}
                      <div className="p-2">
                        <Link
                          href="/profile"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-50"
                        >
                          <User size={17} className="text-gray-500" />
                          My Profile
                        </Link>

                        <Link
                          href="/my-orders"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-50"
                        >
                          <Package size={17} className="text-gray-500" />
                          My Orders
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 p-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          disabled={logoutLoading}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                        >
                          {logoutLoading ? (
                            <LoaderCircle
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <LogOut size={17} />
                          )}

                          {logoutLoading
                            ? "Logging out..."
                            : "Logout"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              /* Guest Account */
              <Link
                href="/login"
                aria-label="Login"
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 hover:text-[#FFE500]"
              >
                <UserRound size={18} />
              </Link>
            )}
          </div>

          {/* Shopping Bag */}
          <button
            type="button"
            aria-label="Shopping bag"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 hover:text-[#FFE500]"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Logout Error */}
      {logoutError && (
        <div className="absolute right-3 top-full z-[70] mt-2 max-w-[calc(100vw-24px)] rounded-lg bg-red-600 px-4 py-2 text-xs text-white shadow-lg sm:right-4">
          {logoutError}
        </div>
      )}

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-x-0 bottom-0 top-[64px] z-40 bg-black/30 backdrop-blur-[2px] sm:top-[76px] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.25,
              },
            }}
            className="absolute left-0 top-full z-50 w-full overflow-hidden lg:hidden"
          >
            <div className="border-t border-white/10 bg-[#075F99] px-4 pb-6 pt-5 shadow-2xl sm:px-6 sm:pb-8 sm:pt-6">

              {/* Menu Heading */}
              <div className="mb-4 flex items-center justify-between sm:mb-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFE500] sm:text-[10px]">
                  Explore VELOR
                </p>

                <span className="text-[9px] tracking-widest text-white/50 sm:text-[10px]">
                  01 — 04
                </span>
              </div>

              {/* Animated Links */}
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col"
              >
                {links.map((link) => (
                  <motion.div
                    key={link.label}
                    variants={linkVariants}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between py-3.5 sm:py-4"
                    >
                      <span className="text-lg font-bold uppercase tracking-wide transition-colors duration-300 group-hover:text-[#FFE500] sm:text-xl">
                        {link.label}
                      </span>

                      <span className="text-xs text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FFE500]">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Account Section */}
              <div className="mt-5 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5">

                {/* Session Loading */}
                {isPending ? (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <LoaderCircle size={16} className="animate-spin" />
                    Loading account...
                  </div>
                ) : user ? (
                  <div className="space-y-2.5">

                    {/* User Details */}
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#087BC1] sm:h-10 sm:w-10 sm:text-sm">
                        {userInitials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold sm:text-sm">
                          {user.name}
                        </p>

                        <p className="truncate text-[10px] text-white/60 sm:text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Profile Link */}
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-xs transition hover:text-[#FFE500] sm:text-sm"
                    >
                      <User size={15} />
                      My Profile
                    </Link>

                    {/* Orders Link */}
                    <Link
                      href="/my-orders"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-xs transition hover:text-[#FFE500] sm:text-sm"
                    >
                      <Package size={15} />
                      My Orders
                    </Link>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className="flex items-center gap-2 py-2 text-xs text-red-200 transition hover:text-white disabled:opacity-60 sm:text-sm"
                    >
                      {logoutLoading ? (
                        <LoaderCircle size={15} className="animate-spin" />
                      ) : (
                        <LogOut size={15} />
                      )}

                      {logoutLoading ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                ) : (
                  /* Guest Login/Register */
                  <div className="flex gap-2.5 sm:gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-lg border border-white/30 py-2.5 text-center text-xs font-semibold transition hover:bg-white/10 sm:py-3 sm:text-sm"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-lg bg-[#FFE500] py-2.5 text-center text-xs font-semibold text-[#171715] transition hover:bg-yellow-300 sm:py-3 sm:text-sm"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Bottom Menu Text */}
              <div className="mt-5 flex items-center justify-between sm:mt-6">
                <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/40 sm:text-[9px] sm:tracking-[0.2em]">
                  Find your own style
                </p>

                <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#FFE500] sm:text-[9px] sm:tracking-[0.2em]">
                  VELOR OUTFITS
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

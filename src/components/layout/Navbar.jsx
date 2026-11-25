
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent background scrolling while menu is open
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="relative z-50 border-b border-white/15 bg-[#087BC1] text-white">
      {/* Navbar */}
      <div className="relative mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        {/* Desktop Links */}
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
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
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
                <X size={23} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={23} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Brand Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-center"
        >
          <span className="block text-2xl font-black tracking-[-0.08em]">
            VELOR
          </span>

          <span className="block text-[8px] font-semibold tracking-[0.42em]">
            OUTFITS
          </span>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="transition hover:text-[#FFE500]"
          >
            <Search size={19} />
          </button>

          <button
            aria-label="Account"
            className="hidden transition hover:text-[#FFE500] sm:block"
          >
            <UserRound size={19} />
          </button>

          <button
            aria-label="Shopping bag"
            className="transition hover:text-[#FFE500]"
          >
            <ShoppingBag size={19} />
          </button>
        </div>
      </div>

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
            className="fixed inset-x-0 bottom-0 top-[108px] z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
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
            <div className="border-t border-white/10 bg-[#075F99] px-6 pb-8 pt-6 shadow-2xl">
              {/* Menu Heading */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFE500]">
                  Explore VELOR
                </p>

                <span className="text-[10px] tracking-widest text-white/50">
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
                {links.map((link, index) => (
                  <motion.div
                    key={link.label}
                    variants={linkVariants}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="text-xl font-bold uppercase tracking-wide transition-colors duration-300 group-hover:text-[#FFE500]">
                        {link.label}
                      </span>

                      <span className="text-xs text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FFE500]">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Menu Text */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Find your own style
                </p>

                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFE500]">
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

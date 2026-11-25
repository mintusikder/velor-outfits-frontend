
"use client";

import Link from "next/link";
import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/products" },
  { name: "Shirts", href: "/shirts" },
  { name: "Pants", href: "/pants" },
  { name: "New Arrivals", href: "/products?sort=newest" },
];

const supportLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "FAQs", href: "/faq" },
  { name: "Shipping & Delivery", href: "/shipping" },
  { name: "Return & Exchange", href: "/returns" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-black tracking-[0.18em]">
                VELOR
                <span className="text-[#FFE500]">.</span>
              </h2>

              <p className="mt-1 text-[10px] font-medium tracking-[0.35em] text-gray-400">
                OUTFITS
              </p>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              Redefining everyday fashion with modern designs,
              premium comfort and timeless style.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm font-bold transition duration-300 hover:border-[#FFE500] hover:bg-[#FFE500] hover:text-black"
              >
                f
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg transition duration-300 hover:border-[#FFE500] hover:bg-[#FFE500] hover:text-black"
              >
                ◎
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-bold transition duration-300 hover:border-[#FFE500] hover:bg-[#FFE500] hover:text-black"
              >
                YT
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-gray-400 transition duration-300 hover:translate-x-1 hover:text-[#FFE500]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Customer Support
            </h3>

            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition duration-300 hover:text-[#FFE500]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Get In Touch
            </h3>

            <div className="space-y-5">

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-[#FFE500]"
                />

                <p className="text-sm leading-6 text-gray-400">
                  Bangladesh
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+8801XXXXXXXXX"
                className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-[#FFE500]"
              >
                <Phone size={18} className="shrink-0 text-[#FFE500]" />
                +880 1XXXXXXXXX
              </a>

              {/* Email */}
              <a
                href="mailto:support@veloroutfits.com"
                className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-[#FFE500]"
              >
                <Mail size={18} className="shrink-0 text-[#FFE500]" />
                <span className="break-all">
                  support@veloroutfits.com
                </span>
              </a>

            </div>

            {/* Payment Methods */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Payment Methods
              </p>

              <div className="flex flex-wrap gap-2">
                {["COD", "bKash", "Nagad"].map((method) => (
                  <span
                    key={method}
                    className="rounded border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-300"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Brand Statement */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-gray-500 md:text-sm">
            DRESS BETTER. FEEL BETTER. BE VELOR.
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 md:flex-row md:px-10">

          {/* Copyright */}
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} VELOR OUTFITS.
            All rights reserved.
          </p>

          {/* Bottom Text */}
          <p className="text-xs text-gray-500">
            Designed for modern living.
          </p>

          {/* Back To Top */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 transition hover:text-[#FFE500]"
          >
            Back to Top
            <ArrowUp size={15} />
          </button>

        </div>
      </div>

    </footer>
  );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function PromotionalBanner() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1600px]">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative isolate overflow-hidden
            min-h-[480px]
            bg-[#101820]
            sm:min-h-[520px]
            lg:min-h-[560px]
          "
        >
          {/* Background Image */}
          <div className="absolute inset-0 -z-30">
            <Image
              src="/images/banners/promo-banner.jpg"
              alt="VELOR OUTFITS promotional fashion campaign"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover object-center"
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 -z-20 bg-black/45" />

          {/* Gradient Overlay */}
          <div
            className="
              absolute inset-0 -z-10
              bg-gradient-to-r
              from-[#07131D]/95
              via-[#07131D]/65
              to-transparent
            "
          />

          {/* Decorative Circle */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full border border-white/10 sm:h-[550px] sm:w-[550px]" />

          <div className="relative flex min-h-[480px] flex-col justify-center px-6 py-16 sm:min-h-[520px] sm:px-10 lg:min-h-[560px] lg:px-16 xl:px-20">

            {/* Campaign Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-[2px] w-8 bg-[#FFE500]" />

              <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-[#FFE500] sm:text-xs">
                LIMITED TIME OFFER
              </p>
            </motion.div>

            {/* Promotional Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="
                max-w-[700px]
                text-[clamp(3.5rem,9vw,7rem)]
                font-black uppercase
                leading-[0.85]
                tracking-[-0.08em]
                text-white
              "
            >
              LEVEL UP
              <span className="mt-2 block text-[#FFE500]">
                YOUR STYLE.
              </span>
            </motion.h2>

            {/* Offer */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-6 flex items-center gap-3 sm:mt-8"
            >
              <span className="text-4xl font-black tracking-[-0.06em] text-white sm:text-6xl">
                30%
              </span>

              <div className="border-l border-white/40 pl-3">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFE500] sm:text-sm">
                  OFF
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/70 sm:text-[10px]">
                  SELECTED STYLES
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="
                mt-5 max-w-[400px]
                text-xs leading-7 text-white/75
                sm:text-sm sm:leading-8
              "
            >
              Refresh your wardrobe with styles that make a statement.
              Get your favorites before they are gone.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-7"
            >
              <Link
                href="/products"
                className="
                  group inline-flex min-h-[50px]
                  items-center gap-5
                  bg-[#FFE500] px-6 py-4
                  text-[#111827]
                  text-[10px] font-extrabold uppercase tracking-[0.18em]
                  transition-all duration-300
                  hover:bg-white
                "
              >
                SHOP THE COLLECTION

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Offer Badge */}
            <div className="absolute right-5 top-5 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full border border-[#FFE500] bg-[#FFE500] text-[#111827] sm:right-10 sm:top-10 sm:h-28 sm:w-28">
              <span className="text-xl font-black sm:text-3xl">
                30%
              </span>

              <span className="text-[8px] font-extrabold uppercase tracking-[0.15em] sm:text-[10px]">
                OFF
              </span>
            </div>

            {/* Bottom Decorative Text */}
            <div className="absolute bottom-5 right-6 hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 sm:flex sm:right-10 lg:right-16">
              VELOR OUTFITS
              <ArrowUpRight size={13} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

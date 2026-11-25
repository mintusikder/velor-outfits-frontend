
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "SHIRTS",
    subtitle: "FIND YOUR PERFECT FIT",
    description: "Everyday essentials. Elevated style.",
    image: "/images/categories/shirts.jpg",
    href: "/shirts",
    number: "01",
  },
  {
    name: "PANTS",
    subtitle: "MADE FOR EVERYDAY",
    description: "Comfort meets modern style.",
    image: "/images/categories/pants.jpg",
    href: "/pants",
    number: "02",
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-[#F5F5F2] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1600px]">

        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#087BC1] sm:text-xs">
              EXPLORE OUR COLLECTION
            </p>

            <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-[#111827] sm:text-4xl md:text-5xl">
              Shop by Category
            </h2>
          </div>

          <p className="max-w-[350px] text-sm leading-7 text-gray-500">
            Discover your everyday style with our carefully curated collection.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={category.href}
                className="group relative block overflow-hidden bg-gray-200"
              >
                {/* Category Image */}
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] md:aspect-[4/5] lg:aspect-[5/4]">
                  <Image
                    src={category.image}
                    alt={`Shop ${category.name.toLowerCase()} at VELOR OUTFITS`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5 transition-opacity duration-500 group-hover:from-black/85" />

                  {/* Top Details */}
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                    <span className="border border-white/40 px-3 py-2 text-[9px] font-bold tracking-[0.2em] text-white backdrop-blur-sm sm:text-[10px]">
                      {category.subtitle}
                    </span>

                    <span className="text-xs font-medium tracking-widest text-white/80">
                      {category.number}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-9">
                    <p className="mb-3 text-xs text-white/75 sm:text-sm">
                      {category.description}
                    </p>

                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-5xl font-black uppercase leading-none tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
                        {category.name}
                      </h3>

                      {/* Shop Button */}
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#123B59] transition-all duration-300 group-hover:bg-[#FFE500] group-hover:rotate-45 sm:h-14 sm:w-14">
                        <ArrowUpRight size={22} />
                      </span>
                    </div>

                    {/* Bottom Line */}
                    <div className="mt-5 h-[1px] w-full bg-white/30">
                      <div className="h-full w-0 bg-[#FFE500] transition-all duration-700 group-hover:w-full" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

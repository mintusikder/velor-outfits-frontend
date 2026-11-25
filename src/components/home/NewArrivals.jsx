
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const newProducts = [
  {
    id: 1,
    name: "Urban Oversized Shirt",
    category: "SHIRTS",
    price: 1450,
    oldPrice: null,
    image: "/images/categories/shirts.jpg",
    slug: "urban-oversized-shirt",
  },
  {
    id: 2,
    name: "Signature Casual Shirt",
    category: "SHIRTS",
    price: 1350,
    oldPrice: 1550,
    image: "/images/categories/shirts.jpg",
    slug: "signature-casual-shirt",
  },
  {
    id: 3,
    name: "Relaxed Cargo Pants",
    category: "PANTS",
    price: 1850,
    oldPrice: null,
    image: "/images/categories/pants.jpg",
    slug: "relaxed-cargo-pants",
  },
  {
    id: 4,
    name: "Everyday Wide Leg Pants",
    category: "PANTS",
    price: 1750,
    oldPrice: null,
    image: "/images/categories/pants.jpg",
    slug: "everyday-wide-leg-pants",
  },
];

const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

export default function NewArrivals() {
  return (
    <section className="bg-[#F5F5F2] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1600px]">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#087BC1]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#087BC1] sm:text-xs">
                JUST DROPPED
              </p>
            </div>

            <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-[#111827] sm:text-4xl md:text-5xl">
              New Arrivals
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
              Fresh styles just landed. Explore our latest collection and find
              something made for you.
            </p>
          </div>

          {/* View All */}
          <Link
            href="/products?sort=newest"
            className="
              group inline-flex w-fit items-center gap-3
              border-b border-[#111827] pb-2
              text-xs font-bold uppercase tracking-[0.15em]
              text-[#111827]
              transition-colors
              hover:border-[#087BC1] hover:text-[#087BC1]
            "
          >
            View New Products
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {newProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group min-w-0"
            >
              {/* Product Image */}
              <Link
                href={`/products/${product.slug}`}
                className="relative block overflow-hidden bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* NEW Badge */}
                <span className="absolute left-3 top-3 z-10 bg-[#087BC1] px-3 py-2 text-[8px] font-extrabold tracking-[0.15em] text-white sm:left-4 sm:top-4 sm:text-[9px]">
                  NEW ARRIVAL
                </span>

                {/* Product Arrow */}
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white text-[#111827] transition-all duration-300 group-hover:bg-[#FFE500] sm:bottom-4 sm:right-4 sm:h-11 sm:w-11">
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </span>
              </Link>

              {/* Product Info */}
              <div className="pt-4 sm:pt-5">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 sm:text-[10px]">
                  {product.category}
                </p>

                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-sm font-bold text-[#111827] transition-colors group-hover:text-[#087BC1] sm:text-base">
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-[#111827] sm:text-base">
                    {formatPrice(product.price)}
                  </span>

                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through sm:text-sm">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Product Details Link */}
                <Link
                  href={`/products/${product.slug}`}
                  className="
                    mt-4 flex w-full items-center justify-center gap-2
                    border border-[#111827] px-3 py-3
                    text-[9px] font-extrabold uppercase tracking-[0.15em]
                    text-[#111827]
                    transition-all duration-300
                    hover:bg-[#111827] hover:text-white
                    sm:text-[10px]
                  "
                >
                  View Product
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

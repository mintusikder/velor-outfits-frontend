
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Classic Oxford Shirt",
    category: "SHIRTS",
    price: 1250,
    oldPrice: 1550,
    image: "/images/categories/shirts.jpg",
    badge: "BEST SELLER",
    slug: "classic-oxford-shirt",
  },
  {
    id: 2,
    name: "Premium Casual Shirt",
    category: "SHIRTS",
    price: 1450,
    oldPrice: null,
    image: "/images/categories/pants.jpg",
    badge: "NEW",
    slug: "premium-casual-shirt",
  },
  {
    id: 3,
    name: "Relaxed Fit Trousers",
    category: "PANTS",
    price: 1650,
    oldPrice: 1950,
    image: "/images/categories/pants.jpg",
    badge: "BEST SELLER",
    slug: "relaxed-fit-trousers",
  },
  {
    id: 4,
    name: "Modern Straight Pants",
    category: "PANTS",
    price: 1550,
    oldPrice: null,
    image: "/images/categories/shirts.jpg",
    badge: null,
    slug: "modern-straight-pants",
  },
];

const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

export default function BestSellingProducts() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1600px]">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#087BC1] sm:text-xs">
              CUSTOMER FAVORITES
            </p>

            <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-[#111827] sm:text-4xl md:text-5xl">
              Best Selling Products
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
              Discover the styles everyone loves. Find your next everyday favorite.
            </p>
          </div>

          {/* View All */}
          <Link
            href="/products"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#111827] pb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#111827] transition-colors hover:border-[#087BC1] hover:text-[#087BC1]"
          >
            View All Products
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {products.map((product, index) => (
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
                className="relative block overflow-hidden bg-[#F3F3F1]"
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

                {/* Product Badge */}
                {product.badge && (
                  <span
                    className={`absolute left-3 top-3 z-10 px-2.5 py-2 text-[8px] font-extrabold tracking-[0.15em] sm:left-4 sm:top-4 sm:text-[9px] ${
                      product.badge === "SALE"
                        ? "bg-[#FFE500] text-[#111827]"
                        : "bg-white text-[#111827]"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Image Arrow */}
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

                <Link
                  href={`/products/${product.slug}`}
                  className="block"
                >
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

                {/* Product Link */}
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

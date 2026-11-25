
"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    location: "Dhaka, Bangladesh",
    product: "Classic Oxford Shirt",
    rating: 5,
    review:
      "The quality is really impressive. The fabric feels premium and the fit is exactly what I was looking for. Definitely worth the price!",
    initials: "RA",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    location: "Chattogram, Bangladesh",
    product: "Relaxed Fit Trousers",
    rating: 5,
    review:
      "Loved the overall quality and design. The trousers are comfortable and look great for both casual and smart outfits. Will order again.",
    initials: "TH",
  },
  {
    id: 3,
    name: "Sabbir Hossain",
    location: "Sylhet, Bangladesh",
    product: "Premium Casual Shirt",
    rating: 4,
    review:
      "Great experience shopping with Velor. The product looks just like the pictures and the packaging was really nice. Highly recommended!",
    initials: "SH",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function CustomerReviews() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center">

          <span className="mb-4 text-xs font-bold tracking-[0.25em] text-[#087BC1]">
            CUSTOMER STORIES
          </span>

          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            WHAT OUR CUSTOMERS SAY
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
            Real experiences from people who love wearing
            VELOR OUTFITS.
          </p>

          {/* Overall Rating */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className="fill-[#FFE500] text-[#FFE500]"
                />
              ))}
            </div>

            <span className="text-sm font-semibold text-gray-900">
              4.9/5
            </span>

            <span className="text-sm text-gray-400">
              Customer Satisfaction
            </span>
          </div>
        </div>

        {/* Review Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-[#FAFAFA] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:bg-white hover:shadow-xl md:p-8"
            >
              {/* Quote Icon */}
              <div className="absolute right-7 top-7 text-gray-200 transition-colors group-hover:text-[#087BC1]/20">
                <Quote size={38} />
              </div>

              {/* Stars */}
              <div className="mb-5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < review.rating
                        ? "fill-[#FFE500] text-[#FFE500]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="mb-7 flex-1 text-sm leading-7 text-gray-600">
                &ldquo;{review.review}&rdquo;
              </p>

              {/* Product */}
              <div className="mb-6 border-t border-gray-200 pt-4">
                <span className="text-[10px] font-semibold tracking-widest text-gray-400">
                  PURCHASED PRODUCT
                </span>

                <p className="mt-1 text-xs font-medium text-gray-800">
                  {review.product}
                </p>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#087BC1]/10 text-sm font-bold text-[#087BC1]">
                  {review.initials}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-gray-900">
                      {review.name}
                    </h3>

                    <BadgeCheck
                      size={15}
                      className="text-[#087BC1]"
                    />
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {review.location}
                  </p>

                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#087BC1]">
                    Verified Buyer
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Thank you for being part of the VELOR community.
          </p>
        </div>

      </div>
    </section>
  );
}

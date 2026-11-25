
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    eyebrow: "THE NEW COLLECTION",
    description:
      "Make your everyday look unforgettable. Discover the latest styles from VELOR OUTFITS.",
    button: "SHOP THE COLLECTION",
    background: "#087BC1",
    accent: "#FFE500",
    number: "01",
  },
  {
    eyebrow: "MADE FOR YOUR STYLE",
    description:
      "Fresh fits. Timeless confidence. Find the pieces that make your style yours.",
    button: "EXPLORE SHIRTS",
    background: "#123B59",
    accent: "#F8D84A",
    number: "02",
  },
  {
    eyebrow: "EVERYDAY ESSENTIALS",
    description:
      "Upgrade your wardrobe with versatile essentials made for everyday expression.",
    button: "EXPLORE NOW",
    background: "#176D70",
    accent: "#F5E66B",
    number: "03",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  const next = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  const previous = () => {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        relative isolate
        h-[calc(100svh-108px)]
        min-h-[560px]
        max-h-[900px]
        overflow-hidden
        bg-[#087BC1]
        text-white
      "
    >
      {/* Full Hero Background Image */}
      <div className="absolute inset-0 -z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.6 },
              scale: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="absolute inset-0"
          >
            <Image
              src="/images/hero/velor-models.jpg"
              alt="VELOR OUTFITS fashion campaign"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Global Image Overlay */}
      <div className="absolute inset-0 -z-20 bg-black/20" />

      {/* Desktop Gradient */}
      <div
        className="
          absolute inset-0 -z-10 hidden md:block
          bg-gradient-to-r
          from-[#061522]/80
          via-[#061522]/35
          to-transparent
        "
      />

      {/* Mobile Gradient */}
      <div
        className="
          absolute inset-0 -z-10 md:hidden
          bg-gradient-to-b
          from-black/45
          via-transparent
          to-black/70
        "
      />

      {/* Decorative Circle */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full border border-white/[0.08]" />

      {/* Main Content */}
      <div
        className="
          relative mx-auto flex h-full max-w-[1600px]
          flex-col justify-center
          px-6 sm:px-10 lg:px-16 xl:px-24
          max-md:px-5
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative z-10
              max-w-[520px]
              max-md:mt-[-35px]
              md:mt-[-20px]
            "
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3 max-md:mb-5">
              <span
                className="h-[2px] w-8"
                style={{ backgroundColor: slide.accent }}
              />

              <p
                className="
                  text-[10px] font-extrabold
                  uppercase tracking-[0.32em]
                  sm:text-xs
                  max-md:text-[9px]
                "
                style={{ color: slide.accent }}
              >
                {slide.eyebrow}
              </p>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="
                ml-1
                flex items-start gap-4
                md:ml-5
                max-md:gap-3
              "
            >
              <span
                className="mt-1 h-12 w-[2px] shrink-0"
                style={{ backgroundColor: slide.accent }}
              />

              <p
                className="
                  max-w-[420px]
                  text-base leading-8 text-white/90
                  sm:text-lg
                  md:text-xl
                  max-md:max-w-[310px]
                  max-md:text-[13px]
                  max-md:leading-[1.8]
                "
              >
                {slide.description}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.a
              href="/shirts"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="
                group ml-1 mt-8
                inline-flex min-h-[52px]
                items-center justify-center gap-5
                bg-white px-7 py-4
                text-[#123B59]
                text-[10px] font-extrabold
                tracking-[0.18em]
                transition-all duration-300
                hover:bg-[#FFE500]
                md:ml-5
                max-md:mt-6
                max-md:min-h-[48px]
              "
            >
              {slide.button}

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>
        </AnimatePresence>

        {/* Slide Controls */}
        <div
          className="
            absolute bottom-7 left-6 right-6 z-20
            flex items-center justify-between
            sm:left-10 sm:right-10
            lg:left-16 lg:right-16
            xl:left-24 xl:right-24
          "
        >
          {/* Pagination */}
          <div className="flex items-center gap-3">
            {slides.map((item, index) => (
              <button
                key={item.number}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  h-1 rounded-full
                  transition-all duration-500
                  ${
                    active === index
                      ? "w-12 bg-white"
                      : "w-5 bg-white/45 hover:bg-white/80"
                  }
                `}
              />
            ))}

            <span className="ml-2 text-[10px] tracking-widest text-white/80">
              {slide.number} / 03
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={previous}
              aria-label="Previous slide"
              className="
                rounded-full border border-white/50
                bg-white/5 p-3 backdrop-blur-sm
                transition-all duration-300
                hover:bg-white hover:text-[#123B59]
              "
            >
              <ArrowLeft size={17} />
            </button>

            <button
              onClick={next}
              aria-label="Next slide"
              className="
                rounded-full border border-white/50
                bg-white/5 p-3 backdrop-blur-sm
                transition-all duration-300
                hover:bg-white hover:text-[#123B59]
              "
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-10 hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 xl:flex">
        <ArrowDown size={13} />
        Scroll to explore
      </div>
    </section>
  );
}

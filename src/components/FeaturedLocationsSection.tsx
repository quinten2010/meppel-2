"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const locations = [
  {
    id: 1,
    name: "Peat Transport Canals",
    description: "Engineered waterways that carried the wealth of Drenthe across the Netherlands",
    category: "Industry",
    image: "⛏️",
  },
  {
    id: 2,
    name: "Merchant Guildhalls",
    description: "15th-century trading houses where merchants negotiated international deals",
    category: "Commerce",
    image: "🏢",
  },
  {
    id: 3,
    name: "Historic Warehouses",
    description: "Massive storage complexes that held wool, linen, and grain for European trade",
    category: "Architecture",
    image: "🏗️",
  },
  {
    id: 4,
    name: "St. Nicolaaskerk",
    description: "Gothic landmark witnessing 700 years of Meppel's spiritual and civic life",
    category: "Heritage",
    image: "⛪",
  },
  {
    id: 5,
    name: "Vecht River Network",
    description: "Natural water highway connecting Meppel to Amsterdam and beyond",
    category: "Geography",
    image: "🌊",
  },
  {
    id: 6,
    name: "Old Harbour Quarter",
    description: "Medieval docking area where ships unloaded goods from across Europe",
    category: "History",
    image: "⚓",
  },
];

export default function FeaturedLocationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="relative py-40">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="noise" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-8 text-6xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
            Historical
            <span className="gradient-text"> Landmarks</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Discover the physical remnants of Meppel&apos;s maritime heritage
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {locations.map((location) => (
            <motion.div
              key={location.id}
              variants={cardVariants}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong group relative overflow-hidden rounded-3xl p-10 transition-all duration-500 hover:bg-white/5"
              whileHover={{ y: -12, boxShadow: "0 40px 80px rgba(99, 103, 241, 0.15)" }}
            >
              <div className="absolute -right-16 -top-16 text-9xl opacity-5 transition-all group-hover:scale-110">
                {location.image}
              </div>

              <div className="relative">
                <div className="mb-5 inline-block rounded-full bg-indigo-500/15 px-4 py-1.5 text-sm font-medium text-indigo-300">
                  {location.category}
                </div>

                <h3 className="mb-4 text-3xl font-bold text-white">{location.name}</h3>

                <p className="mb-8 text-white/50 leading-relaxed">{location.description}</p>

                <motion.button
                  className="flex items-center gap-3 text-sm font-medium text-indigo-400 transition-all hover:text-white"
                  whileHover={{ x: 8 }}
                >
                  Explore History
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
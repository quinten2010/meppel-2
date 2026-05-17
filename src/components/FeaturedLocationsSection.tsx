"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const locations = [
  {
    id: 1,
    name: "Historic Meppel",
    description: "Step back in time through cobblestone streets and centuries-old architecture",
    category: "History",
    image: "🏛️",
  },
  {
    id: 2,
    name: "Meppeler Vecht",
    description: "Picturesque waterways winding through lush landscapes",
    category: "Nature",
    image: "🌿",
  },
  {
    id: 3,
    name: "Museum Schaudefavorius",
    description: "Art and history converge in this cultural landmark",
    category: "Culture",
    image: "🎨",
  },
  {
    id: 4,
    name: "St. Nicolaaskerk",
    description: "Gothic architecture reaching toward the sky",
    category: "Architecture",
    image: "⛪",
  },
  {
    id: 5,
    name: "Park Schoonoord",
    description: "Tranquil gardens perfect for reflection and exploration",
    category: "Nature",
    image: "🌳",
  },
  {
    id: 6,
    name: "Hollandsche Ijssel",
    description: "Where rivers meet history in the Dutch countryside",
    category: "Scenic",
    image: "🌅",
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
            Featured
            <span className="gradient-text"> Locations</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Discover the most remarkable spots in Meppel through our curated collection
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
                  Explore
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
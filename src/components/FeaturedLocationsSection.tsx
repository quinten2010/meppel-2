"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const locations = [
  {
    id: 1,
    name: "Grote of Mariakerk",
    description: "1422 hall church with monumental tower, built after parish independence. Features Schnitger organ (1721) and cupola added in 1827.",
    category: "Heritage",
    year: "1422",
    icon: "⛪",
  },
  {
    id: 2,
    name: "Slot de Kinckhorst",
    description: "1509 fortress constructed by Drost Roelof van Munster for Drenthe's independence. Military bastion during Eighty Years' War.",
    category: "Military",
    year: "1509",
    icon: "🏰",
  },
  {
    id: 3,
    name: "Historic Harbor Quarter",
    description: "Medieval docking area where ships unloaded goods from across Europe. Site of the 'Poort van Drenthe' market privileges (1460).",
    category: "Commerce",
    year: "1460",
    icon: "⚓",
  },
  {
    id: 4,
    name: "Merchant Guildhalls",
    description: "15th-century trading houses where merchants negotiated international deals. Center of shippers' guild dominance by 1600s.",
    category: "Architecture",
    year: "1400s",
    icon: "🏢",
  },
  {
    id: 5,
    name: "Meppelerdiep Canal",
    description: "Natural water highway connecting Meppel to Amsterdam. Deepened in 1541 for larger vessels, accommodating 2000-ton ships by 1928.",
    category: "Geography",
    year: "1541",
    icon: "🌊",
  },
  {
    id: 6,
    name: "Schouwburg Ogterop",
    description: "1886 regional theater enriching cultural life. One of the premier cultural venues in the northeast Netherlands.",
    category: "Culture",
    year: "1886",
    icon: "🎭",
  },
  {
    id: 7,
    name: "Jewish Cemetery at Het Boddenkampje",
    description: "1767 site formalizing Jewish community presence. Purchased during the formalization of Meppel's significant Jewish population.",
    category: "Heritage",
    year: "1767",
    icon: "🕍",
  },
  {
    id: 8,
    name: "Railway Station",
    description: "1867 connection catalyzing industrial growth. Shifted economic focus from water to rail transport, enabling 'Little Rotterdam' era.",
    category: "Transport",
    year: "1867",
    icon: "🚂",
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
            Discover the physical remnants of Meppel&apos;s maritime heritage and cultural legacy
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
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
                {location.icon}
              </div>

              <div className="relative">
                <div className="mb-5 inline-block rounded-full bg-indigo-500/15 px-4 py-1.5 text-sm font-medium text-indigo-300">
                  {location.category}
                </div>

                <h3 className="mb-4 text-3xl font-bold text-white">{location.name}</h3>
                <div className="text-xs text-indigo-400 mb-2">{location.year}</div>

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
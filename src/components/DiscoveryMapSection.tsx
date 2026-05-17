"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const locations = [
  { id: 1, name: "Historic Center", x: 30, y: 40, category: "History" },
  { id: 2, name: "Meppeler Vecht", x: 55, y: 25, category: "Nature" },
  { id: 3, name: "Museum Schaudefavorius", x: 45, y: 60, category: "Culture" },
  { id: 4, name: "St. Nicolaaskerk", x: 25, y: 55, category: "Architecture" },
  { id: 5, name: "Park Schoonoord", x: 65, y: 45, category: "Nature" },
];

export default function DiscoveryMapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="discovery" ref={ref} className="relative min-h-screen py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            Interactive
            <span className="gradient-text"> Discovery Map</span>
          </h2>
          <p className="text-lg text-white/60">Explore Meppel&apos;s hidden gems through our immersive map</p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            className="relative aspect-[4/3] w-full glass-strong rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="mapGlow">
                  <stop offset="0%" stopColor="rgba(99, 103, 241, 0.3)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {locations.map((location, index) => (
                <g key={location.id}>
                  <motion.circle
                    cx={location.x}
                    cy={location.y}
                    r="1"
                    fill="url(#mapGlow)"
                    initial={{ r: 0 }}
                    animate={isInView ? { r: 8 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  />
                  <motion.circle
                    cx={location.x}
                    cy={location.y}
                    r="2"
                    fill="#6366f1"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  />
                  <motion.circle
                    cx={location.x}
                    cy={location.y}
                    r="4"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: [0, 1, 0] } : {}}
                    transition={{ duration: 2, delay: 0.5 + index * 0.1, repeat: Infinity }}
                  />

                  <motion.foreignObject
                    x={location.x - 12}
                    y={location.y + 6}
                    width="24"
                    height="24"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white backdrop-blur transition-all hover:bg-white/10">
                      {location.name.substring(0, 2)}
                    </div>
                  </motion.foreignObject>
                </g>
              ))}
            </svg>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass rounded-2xl p-6">
                <div className="mb-4 text-xl font-semibold text-white">
                  {locations[0].name}
                </div>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-indigo-300">
                    {locations[0].category}
                  </span>
                  <span>•</span>
                  <span>Click on the map to explore</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
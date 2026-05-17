"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { id: 1, name: "Historic Harbor", x: 30, y: 40, category: "1141" },
  { id: 2, name: "Meppeler Vecht", x: 55, y: 25, category: "Trade Route" },
  { id: 3, name: "Merchant Quarter", x: 45, y: 60, category: "1500s" },
  { id: 4, name: "St. Nicolaaskerk", x: 25, y: 55, category: "Landmark" },
  { id: 5, name: "Peat Transport Canal", x: 65, y: 45, category: "Industry" },
];

export default function DiscoveryMapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      gsap.fromTo(
        ".location-point",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isInView]);

  return (
    <section id="discovery" ref={ref} className="relative min-h-screen py-40">
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
            Trade
            <span className="gradient-text"> Routes</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Navigate Meppel&apos;s historical water network that shaped centuries of commerce
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            className="relative aspect-[4/3] w-full glass-strong rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="pulseGlow">
                  <stop offset="0%" stopColor="rgba(99, 103, 241, 0.4)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(99, 103, 241, 0.3)" />
                  <stop offset="100%" stopColor="rgba(236, 72, 153, 0.3)" />
                </linearGradient>
              </defs>

              <path
                d="M 20 30 C 35 20, 50 25, 60 40 S 75 55, 85 45"
                fill="none"
                stroke="url(#routeLine)"
                strokeWidth="1"
                strokeDasharray="4 2"
                className="opacity-30"
              />

              {locations.map((location, index) => (
                <g key={location.id}>
                  <motion.circle
                    className="location-point"
                    cx={location.x}
                    cy={location.y}
                    r="1"
                    fill="url(#pulseGlow)"
                    initial={{ r: 0 }}
                    animate={isInView ? { r: 10 } : {}}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  />
                  <motion.circle
                    className="location-point"
                    cx={location.x}
                    cy={location.y}
                    r="2.5"
                    fill="#6366f1"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  />
                  <motion.foreignObject
                    x={location.x - 14}
                    y={location.y + 8}
                    width="28"
                    height="28"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/80 backdrop-blur transition-all hover:bg-white/10">
                      {location.name.substring(0, 2)}
                    </div>
                  </motion.foreignObject>
                </g>
              ))}
            </svg>

            <div className="absolute bottom-8 left-8 right-8">
              <motion.div
                className="glass rounded-3xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="mb-3 text-2xl font-bold text-white">
                  Historic Harbor
                </div>
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span className="rounded-full bg-indigo-500/20 px-4 py-1.5 text-indigo-300 font-medium">
                    1141
                  </span>
                  <span>Where Meppel first touched the water</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
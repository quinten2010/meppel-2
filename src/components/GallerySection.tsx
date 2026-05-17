"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const galleryItems = [
  { id: 1, title: "Morning Mist over Meppel", category: "Landscape" },
  { id: 2, title: "Historic Canal Houses", category: "Architecture" },
  { id: 3, title: "Summer Festival Celebrations", category: "Events" },
  { id: 4, title: "Autumn at Park Schoonoord", category: "Nature" },
  { id: 5, title: "Evening Lights over the Vecht", category: "Scenic" },
  { id: 6, title: "Winter Magic in the City Center", category: "Seasonal" },
];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            Cinematic
            <span className="gradient-text"> Gallery</span>
          </h2>
          <p className="text-lg text-white/60">A visual journey through Meppel&apos;s seasons and stories</p>
        </motion.div>

        <div ref={ref} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30" />
              <div className="absolute inset-0 bg-black/40 transition-all group-hover:bg-black/20" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass inline-block rounded-full px-3 py-1 text-xs text-white/80 mb-3">
                  {item.category}
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>

              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const galleryItems = [
  { id: 1, title: "Harbor at Dawn", category: "1600s" },
  { id: 2, title: "Market Square", category: "1487" },
  { id: 3, title: "Canal Transportation", category: "1700s" },
  { id: 4, title: "Parish Church Interior", category: "1422" },
  { id: 5, title: "Peat Barges", category: "1500s" },
  { id: 6, title: "Winter on the Vecht", category: "1800s" },
];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
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
            <span className="gradient-text"> Archive</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Visual remnants of Meppel&apos;s evolving landscape
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-square overflow-hidden rounded-3xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20" />
              <div className="absolute inset-0 bg-black/40 transition-all group-hover:bg-black/20" />

              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass inline-block rounded-full px-4 py-1.5 text-sm text-white/70 mb-3">
                  {item.category}
                </div>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              </div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              >
                <svg className="h-16 w-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Scene3D from "./Scene3D";
import Lenis from "lenis";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("discovery");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      style={{ opacity, scale, y }}
    >
      <div className="absolute inset-0">
        <Scene3D />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block">Discover</span>
            <span className="gradient-text block">Meppel</span>
          </h1>
        </motion.div>

        <motion.p
          className="mb-12 max-w-2xl text-lg text-white/70 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          A journey through time, culture, and innovation in the heart of Overijssel
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.button
            className="glass-strong rounded-full px-8 py-4 font-medium text-white transition-all hover:bg-white/10"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99, 103, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start Exploration
          </motion.button>
          <motion.button
            className="rounded-full border border-white/20 px-8 py-4 font-medium text-white transition-all hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Experience
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="mb-2 text-sm">Scroll to explore</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </motion.section>
  );
}
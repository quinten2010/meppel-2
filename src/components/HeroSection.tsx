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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

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
    const nextSection = document.getElementById("waterways");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      <div className="absolute inset-0">
        <Scene3D />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-4 text-center"
        style={{ y: yText }}
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h1 className="text-7xl font-bold tracking-tighter text-white sm:text-8xl md:text-9xl lg:text-[10rem]">
            <span className="block mb-4">Meppel</span>
            <span className="gradient-text block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Built by Water
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="mb-20 max-w-2xl text-xl text-white/60 md:text-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          A cinematic journey through 900 years of Dutch maritime heritage, from 1141 to present
        </motion.p>

        <motion.div
          className="flex flex-col gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            className="glass-strong rounded-full px-10 py-5 text-lg font-medium text-white transition-all hover:bg-white/10"
            whileHover={{ scale: 1.03, boxShadow: "0 0 80px rgba(99, 103, 241, 0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Begin Journey
          </motion.button>
          <motion.button
            className="rounded-full border border-white/15 px-10 py-5 text-lg font-medium text-white/80 transition-all hover:bg-white/5 hover:text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Watch Experience
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center text-white/40">
          <span className="mb-3 text-sm tracking-wider">Scroll to explore</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </motion.section>
  );
}
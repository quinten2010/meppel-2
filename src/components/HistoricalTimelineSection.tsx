"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "1141",
    title: "First Mention",
    description: "Meppel first documented as 'Mepele' - a small settlement along the peat transport routes",
    icon: "📜",
  },
  {
    year: "1250",
    title: "Canal Networks",
    description: "Construction of the first canal systems connecting Drenthe to the Zuiderzee",
    icon: "🛥️",
  },
  {
    year: "1350",
    title: "Trade Hub",
    description: "Meppel emerges as a major trading center for peat, rye, and wool",
    icon: "⚖️",
  },
  {
    year: "1500",
    title: "Merchant Era",
    description: "Prosperous period of warehouses, guildhalls, and merchant families",
    icon: "🏛️",
  },
  {
    year: "1800",
    title: "Industrial Growth",
    description: "Expansion of shipping fleet and integration into national trade network",
    icon: "⚙️",
  },
  {
    year: "Present",
    title: "Modern Meppel",
    description: "Historic city center preserving centuries of waterborne commerce",
    icon: "🌆",
  },
];

export default function HistoricalTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.fromTo(
          item as HTMLElement,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: "top bottom-=100",
              end: "bottom top+=100",
              toggleActions: "play none none reverse",
            },
            duration: 1,
            ease: "power3.out",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-40">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="noise" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mb-32 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-8 text-6xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
            Through
            <span className="gradient-text"> Time</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Journey through Meppel&apos;s evolution from settlement to trading hub
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-10 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />

          {timelineEvents.map((event, index) => (
            <div
              key={event.year}
              className={`timeline-item relative flex items-center gap-16 mb-24 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "text-right pr-16" : "pl-16"}`}>
                <motion.div
                  className="glass-strong rounded-3xl p-8"
                  whileHover={{ y: -8, boxShadow: "0 40px 80px rgba(99, 103, 241, 0.15)" }}
                >
                  <div className="text-4xl mb-4">{event.icon}</div>
                  <div className="text-5xl font-bold text-white mb-2">{event.year}</div>
                  <div className="text-xl font-semibold text-white/80 mb-3">{event.title}</div>
                  <p className="text-white/50">{event.description}</p>
                </motion.div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
                {event.icon}
              </div>

              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
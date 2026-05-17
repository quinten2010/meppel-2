"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const timelineNodes = [
  { year: 1141, title: "First Mention", summary: "Meppel first appears in historical records as a small settlement", key: ["First documented", "Farm-based community"], icon: "📜" },
  { year: 1422, title: "Parish Church", summary: "St. Nicolaaskerk is built, establishing Meppel as a separate parish", key: ["Religious center", "Community identity"], icon: "⛪" },
  { year: 1460, title: "Market Rights", summary: "Two annual fairs granted, beginning structured commerce", key: ["Trade privileges", "Economic foundation"], icon: "⚖️" },
  { year: 1487, title: "Weekly Market", summary: "Permission for weekly market accelerates local economy", key: ["Regular trade", "Urban growth"], icon: "🏛️" },
  { year: 1644, title: "City Rights", summary: "Official city status with expanded civic privileges", key: ["Legal autonomy", "Municipal power"], icon: "🏰" },
  { year: 1867, title: "Railway Station", summary: "Rail connection transforms Meppel's reach and economy", key: ["Modern transport", "Broader network"], icon: "🚂" },
];

export default function HistoricalTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-node").forEach((node) => {
        gsap.fromTo(
          node as HTMLElement,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: node as HTMLElement,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
            duration: 0.8,
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
            Key moments in Meppel&apos;s evolution from settlement to city
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />

          {timelineNodes.map((node, index) => (
            <div
              key={node.year}
              className={`timeline-node relative flex items-center gap-16 mb-20 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "text-right pr-16" : "pl-16"}`}>
                <motion.div
                  className="glass-strong rounded-3xl p-8 cursor-pointer inline-block"
                  onClick={() => setActiveNode(index)}
                  whileHover={{ y: -8, boxShadow: "0 40px 80px rgba(99, 103, 241, 0.15)" }}
                >
                  <div className="text-4xl mb-3">{node.icon}</div>
                  <div className="text-5xl font-bold text-white mb-2">{node.year}</div>
                  <div className="text-xl font-semibold text-white/80 mb-3">{node.title}</div>
                  <p className="text-white/50 text-sm">{node.summary}</p>
                </motion.div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
                {node.icon}
              </div>

              <div className="w-1/2" />
            </div>
          ))}
        </div>

        {activeNode !== null && (
          <motion.div
            className="fixed inset-40 z-50 mx-auto max-w-2xl my-auto glass-strong rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white"
              onClick={() => setActiveNode(null)}
            >
              ✕
            </button>
            <div className="text-5xl mb-4">{timelineNodes[activeNode].icon}</div>
            <div className="text-6xl font-bold text-white mb-2">{timelineNodes[activeNode].year}</div>
            <div className="text-2xl font-semibold text-white/80 mb-4">{timelineNodes[activeNode].title}</div>
            <p className="text-white/60 mb-6">{timelineNodes[activeNode].summary}</p>
            <ul className="space-y-2">
              {timelineNodes[activeNode].key.map((k) => (
                <li key={k} className="text-white/50">• {k}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
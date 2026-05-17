"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 885, label: "Years of History", suffix: "+" },
  { value: 36616, label: "Population (2026 est)", suffix: "+" },
  { value: 25, label: "Timeline Intervals", suffix: "+" },
  { value: 1500000, label: "Annual Visitors", suffix: "+" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const duration = 2000;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            By the
            <span className="gradient-text"> Numbers</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Quantitative perspective on Meppel&apos;s development
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-strong rounded-3xl p-10 text-center flex flex-col justify-center"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="mb-4 text-6xl font-bold text-white">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/50 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
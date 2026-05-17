"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WaterwaysSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".water-wave",
        { backgroundPosition: "0% 0%" },
        {
          backgroundPosition: "100% 0%",
          duration: 20,
          repeat: -1,
          ease: "none",
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="waterways" className="relative h-screen py-40">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        <div
          className="water-wave absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(99, 103, 241, 0.1) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="noise" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-12 text-6xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
            Built by
            <span className="gradient-text"> Water</span>
          </h2>

          <p className="text-xl text-white/60 mb-16 leading-relaxed">
            Meppel&apos;s destiny was shaped by waterways. Canals carved through peat bogs became arteries of commerce,
            carrying the wealth that would build a city.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Peat Trade", value: "1350s" },
              { label: "Canal Miles", value: "50+" },
              { label: "Merchant Houses", value: "100+" },
              { label: "Trade Routes", value: "12+" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                <div className="text-sm text-white/50">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
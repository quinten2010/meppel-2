"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tradeRoutes = [
  { id: 1, name: "Peat Flow", destination: "Amsterdam & Holland", goods: "Peat 'brown gold'", period: "1141–1500s", key: "Primary fuel for Dutch cities", intensity: 1 },
  { id: 2, name: "Grain Route", destination: "Northern Netherlands", goods: "Rye, Oats", period: "1300s–1600s", key: "Agricultural foundation", intensity: 0.8 },
  { id: 3, name: "Wood Supply", destination: "Friesland & Beyond", goods: "Timber", period: "1200s–1400s", key: "Construction and shipbuilding", intensity: 0.6 },
  { id: 4, name: "Wool Transport", destination: "Germany & Low Countries", goods: "Wool, Linen, Eversdoek", period: "1400s–1700s", key: "Textile trade, sailcloth production", intensity: 0.9 },
  { id: 5, name: "Livestock", destination: "Holland", goods: "Cattle, Piglet Market", period: "1500s–1800s", key: "Meat and dairy, 'Biggenmarkt'", intensity: 0.7 },
  { id: 6, name: "Pharmaceuticals", destination: "Global", goods: "Gist-Brocades products", period: "1860s–present", key: "Industrial chemicals", intensity: 0.85 },
  { id: 7, name: "Printing Goods", destination: "Netherlands", goods: "Printed materials", period: "1890s–1950s", key: "Publishing hub", intensity: 0.75 },
];

function FlowingRoute({ route, isActive, index }: { route: typeof tradeRoutes[0]; isActive: boolean; index: number }) {
  const routeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!routeRef.current) return;

    gsap.fromTo(
      routeRef.current,
      { width: "0%", opacity: 0 },
      {
        width: isActive ? "100%" : "0%",
        opacity: isActive ? route.intensity : 0,
        duration: 1.5,
        delay: index * 0.2,
        ease: "power3.out",
      }
    );
  }, [isActive, index, route.intensity]);

  return (
    <div
      ref={routeRef}
      className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent"
      style={{
        top: `${15 + index * 12}%`,
        filter: `blur(${isActive ? 2 : 0}px)`,
        boxShadow: isActive ? "0 0 20px rgba(99, 103, 241, 0.5)" : "none",
      }}
    />
  );
}

export default function TradeRoutesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeRoutes, setActiveRoutes] = useState([false, false, false, false, false, false, false]);
  const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      tradeRoutes.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top center",
          onEnter: () => {
            setActiveRoutes(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          },
        });
      });
    }, sectionRef);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(99, 103, 241, 0.1) 0%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="noise" />

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-20 text-center">
            <h2 className="mb-8 text-6xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
              Trade
              <span className="gradient-text"> Currents</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Peat moved south through Meppel&apos;s canal arteries toward Holland&apos;s cities,
              establishing the foundation for 900 years of commerce
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl h-96">
            <div className="absolute inset-0 glass-strong rounded-3xl overflow-hidden">
              <div className="relative w-full h-full">
                {tradeRoutes.map((route, i) => (
                  <FlowingRoute key={route.id} route={route} isActive={activeRoutes[i]} index={i} />
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 p-6">
              {tradeRoutes.map((route, i) => (
                <motion.div
                  key={route.id}
                  className="glass rounded-2xl p-3 cursor-pointer relative"
                  onHoverStart={() => setHoveredRoute(i)}
                  onHoverEnd={() => setHoveredRoute(null)}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="text-xs font-medium text-white mb-1">{route.name}</div>
                  <div className="text-[10px] text-white/50 mb-1">{route.destination}</div>
                  <div className="text-[10px] text-indigo-300">{route.goods}</div>
                  {hoveredRoute === i && (
                    <motion.div
                      className="absolute -top-16 left-0 glass-strong rounded-lg p-2 text-[10px] whitespace-nowrap z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="text-white font-medium mb-1">{route.period}</div>
                      <div className="text-white/60">{route.key}</div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
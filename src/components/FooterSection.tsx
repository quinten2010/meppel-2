"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="relative py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/80" />
        <div className="noise" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="glass-strong rounded-3xl p-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <motion.div
                className="mb-8 text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="gradient-text">Meppel</span>
                <span className="text-white"> Discovery</span>
              </motion.div>

              <motion.p
                className="mb-10 text-white/50 text-lg leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                An immersive journey through 900 years of Dutch maritime heritage, where water shaped a city.
              </motion.p>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="glass rounded-full px-5 py-2.5 text-sm text-white/60 transition-all hover:text-white hover:bg-white/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="mb-6 text-sm font-semibold text-white/60 uppercase tracking-wider">Explore</h4>
                <ul className="space-y-4 text-base">
                  {["Timeline", "Trade Routes", "Canals", "Landmarks"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 transition-all hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-sm font-semibold text-white/60 uppercase tracking-wider">Connect</h4>
                <ul className="space-y-4 text-base">
                  {["About", "Source", "Credits", "Privacy"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 transition-all hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            © 2024 Meppel Discovery. A cinematic historical experience.
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
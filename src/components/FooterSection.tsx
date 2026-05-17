"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="relative py-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="glass-strong rounded-3xl p-12">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <motion.div
                className="mb-6 text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="gradient-text">Meppel</span>
                <span className="text-white"> Discovery</span>
              </motion.div>

              <motion.p
                className="mb-8 text-white/60"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Experience the future of city exploration through our immersive digital journey
              </motion.p>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="glass rounded-full px-4 py-2 text-sm text-white/60 transition-all hover:text-white hover:bg-white/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="mb-4 text-sm font-semibold text-white/80">Explore</h4>
                <ul className="space-y-2 text-sm">
                  {["Map", "Locations", "Gallery", "Events"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/60 transition-all hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold text-white/80">Connect</h4>
                <ul className="space-y-2 text-sm">
                  {["About", "Contact", "Support", "Privacy"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/60 transition-all hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            © 2024 Meppel Discovery. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
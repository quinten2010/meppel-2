"use client";

import { useEffect, useState } from "react";
import { MEPPelTimeline } from "@/components/MEPPelTimeline";
import { ParticleFooter } from "@/components/ParticleFooter";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setLoading(false), 750);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="app">
      {loading && (
        <div
          id="loader"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.75s ease" }}
        >
          <div className="ascii" />
        </div>
      )}
      <MEPPelTimeline />
      <ParticleFooter />
    </div>
  );
}
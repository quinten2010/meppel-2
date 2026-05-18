"use client";

import { useEffect, useState, useRef } from "react";
import { MEPPelTimeline } from "@/components/MEPPelTimeline";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => setLoading(false), 750);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="app">
      {loading && (
        <div
          ref={loaderRef}
          id="loader"
          style={{ opacity, transition: "opacity 0.75s ease" }}
        >
          <div className="ascii" />
        </div>
      )}
      <MEPPelTimeline />
    </div>
  );
}
"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

const titleText = "MEPPEL TIMELINE";

function GlitchText() {
  const groupRef = useRef<THREE.Group>(null!);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (groupRef.current && glitch) {
      groupRef.current.position.x = (Math.random() - 0.5) * 0.5;
    } else if (groupRef.current) {
      groupRef.current.position.x = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={1}
        height={0.2}
        position={[-8, 0, 0]}
      >
        {titleText}
        <meshBasicMaterial color="#b6bac5" />
      </Text3D>
    </group>
  );
}

export function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onLeave: () => setVisible(false),
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none bg-[#383e4e] flex items-center justify-center"
    >
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <GlitchText />
      </Canvas>
    </div>
  );
}
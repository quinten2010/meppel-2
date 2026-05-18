"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef, useMemo } from "react";
import { IceBlock } from "./IceBlock";
import { PostEffects } from "./PostEffects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: 1141, title: "Episcopal Inception", z: -0 },
  { year: 1422, title: "Tower Construction", z: -25 },
  { year: 1460, title: "Market Rights", z: -50 },
  { year: 1644, title: "City Sovereignty", z: -75 },
  { year: 1742, title: "Jewish Heritage", z: -100 },
  { year: 1867, title: "The Iron Road", z: -125 },
  { year: 1942, title: "The Great Void", z: -150 },
  { year: 2026, title: "Port of Zwolle", z: -175 },
];

const scrambleChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function LetterScrambleText({
  text,
  position,
  scramble = false,
}: {
  text: string;
  position: [number, number, number];
  scramble?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (scramble) {
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplayText((prev) =>
          prev
            .split("")
            .map((c, i) => {
              if (i < iterations) return text[i] || c;
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join("")
        );
        iterations += 1 / 3;
        if (iterations > text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scramble, text]);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#b6bac5";
    ctx.font = "60px monospace";
    ctx.textAlign = "center";
    ctx.fillText(displayText, canvas.width / 2, 80);
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, [displayText]);

  useFrame(() => {
    const material = meshRef.current?.material as THREE.MeshBasicMaterial;
    if (material?.map) {
      material.map.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[3, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.95}
        color="#b6bac5"
      />
    </mesh>
  );
}

function MilestoneBlock({
  year,
  title,
  z,
}: {
  year: number;
  title: string;
  z: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, z]}>
      <IceBlock position={[0, 0, 0]} />
      <LetterScrambleText
        position={[0, -2.5, 0]}
        text={year.toString()}
      />
      <LetterScrambleText
        position={[0, -3.3, 0]}
        text={title}
      />
    </group>
  );
}

export function MEPPelTimeline() {
  const canvasRef = useRef<HTMLDivElement>(null!);
  const cameraZ = useRef(5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            cameraZ.current = 5 + self.progress * 175;
          },
        },
      });
    }, canvasRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={canvasRef} className="relative h-[400vh] bg-[#383e4e]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#383e4e"]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {milestones.map((m) => (
            <MilestoneBlock
              key={m.year}
              year={m.year}
              title={m.title}
              z={m.z}
            />
          ))}
          <PostEffects />
        </Canvas>
      </div>
    </div>
  );
}
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;

function createRandomPositions(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  return pos;
}

function createTargetPositions(word: string, count: number) {
  const targets = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = ((i % word.length) * 3) + (Math.random() - 0.5) * 0.5;
    const y = (Math.random() - 0.5) * 2;
    const z = (Math.random() - 0.5) * 5;
    targets[i * 3] = x;
    targets[i * 3 + 1] = y;
    targets[i * 3 + 2] = z;
  }
  return targets;
}

function ParticleSystem({ hoveredWord }: { hoveredWord: string | null }) {
  const points = useRef<THREE.Points>(null!);

  const positions = useMemo(() => createRandomPositions(PARTICLE_COUNT), []);
  const targetPositions = useMemo(
    () => createTargetPositions(hoveredWord || "MEPPEL", PARTICLE_COUNT),
    [hoveredWord]
  );

  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();
    const currentPos = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      currentPos[ix] += (targetPositions[ix] - currentPos[ix]) * 0.02;
      currentPos[ix + 1] += (targetPositions[ix + 1] - currentPos[ix + 1]) * 0.02;
      currentPos[ix + 2] += (targetPositions[ix + 2] - currentPos[ix + 2]) * 0.02;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#b6bac5"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export function ParticleFooter() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  return (
    <div className="relative h-64 w-full">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ParticleSystem hoveredWord={hoveredWord} />
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 pb-8">
        {["Heritage", "Canals", "Trade"].map((link) => (
          <button
            key={link}
            className="glass rounded-full px-6 py-2 text-white/70 hover:text-white transition-colors"
            onMouseEnter={() => setHoveredWord(link)}
            onMouseLeave={() => setHoveredWord(null)}
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}
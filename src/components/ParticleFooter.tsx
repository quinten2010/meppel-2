"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;

function createRandomPositions(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  return pos;
}

function createShipShape(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const r = 1 + Math.sin(t * 3) * 0.2;
    positions[i * 3] = Math.cos(t) * r;
    positions[i * 3 + 1] = Math.sin(t) * r;
    positions[i * 3 + 2] = 0;
  }
  return positions;
}

function createTowerShape(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }
  return positions;
}

function createCanalShape(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
  }
  return positions;
}

function ParticleSystem({ hoverState }: { hoverState: number }) {
  const points = useRef<THREE.Points>(null!);
  const targetPositions = useRef<Float32Array>(createRandomPositions(PARTICLE_COUNT));
  const positions = useMemo(() => createRandomPositions(PARTICLE_COUNT), []);

  useEffect(() => {
    switch (hoverState) {
      case 1: targetPositions.current = createShipShape(PARTICLE_COUNT); break;
      case 2: targetPositions.current = createTowerShape(PARTICLE_COUNT); break;
      case 3: targetPositions.current = createCanalShape(PARTICLE_COUNT); break;
      default: targetPositions.current = createRandomPositions(PARTICLE_COUNT);
    }
  }, [hoverState]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    const currentPos = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      currentPos[ix] += (targetPositions.current[ix] - currentPos[ix]) * 0.03;
      currentPos[ix + 1] += (targetPositions.current[ix + 1] - currentPos[ix + 1]) * 0.03;
      currentPos[ix + 2] += (targetPositions.current[ix + 2] - currentPos[ix + 2]) * 0.03;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y = time * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export function ParticleFooter() {
  const [hoverState, setHoverState] = useState(0);

  return (
    <div className="relative h-64 w-full bg-[#A0A5B1]">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ParticleSystem hoverState={hoverState} />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 pb-8">
        {[
          { label: "ARCHIVE", state: 2 },
          { label: "CANALS", state: 3 },
          { label: "CONTACT", state: 1 },
        ].map((link) => (
          <button
            key={link.label}
            className="text-[#ffffff]/70 hover:text-[#ffffff] transition-colors font-mono text-lg font-bold"
            style={{ textShadow: "0px 0px 5px rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={() => setHoverState(link.state)}
            onMouseLeave={() => setHoverState(0)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
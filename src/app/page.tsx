"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const MILESTONES = [
  { year: 1141, title: "EPISCOPAL INCEPTION", z: 0 },
  { year: 1422, title: "TOWER CONSTRUCTION", z: -30 },
  { year: 1460, title: "MARKET RIGHTS", z: -60 },
  { year: 1644, title: "CITY SOVEREIGNTY", z: -90 },
  { year: 1742, title: "JEWISH HERITAGE", z: -120 },
  { year: 1867, title: "THE IRON ROAD", z: -150 },
  { year: 1942, title: "THE GREAT VOID", z: -180 },
  { year: 2026, title: "PORT OF ZWOLLE", z: -210 },
];

function Block({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
    </mesh>
  );
}

function Label({ text, position }: { text: string; position: [number, number, number] }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 256, 64);
    return new THREE.CanvasTexture(canvas);
  }, [text]);

  return (
    <mesh position={position}>
      <planeGeometry args={[3, 0.75]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function App() {
  return (
    <div id="app" style={{ width: "100vw", height: "100vh", background: "#A0A5B1" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#A0A5B1"]} />
        <ambientLight intensity={1} />
        {MILESTONES.map((m) => (
          <group key={m.year} position={[0, 0, m.z]}>
            <Block position={[0, 0, 0]} />
            <Label text={m.year.toString()} position={[0, -1.8, 0]} />
            <Label text={m.title} position={[0, -2.5, 0]} />
          </group>
        ))}
      </Canvas>
    </div>
  );
}

export default App;
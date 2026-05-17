"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { TimeBlock } from "./TimeBlock";

const historicalYears = [
  { year: 1141, title: "Episcopal Inception", z: 0 },
  { year: 1241, title: "Transshipment Hub", z: -25 },
  { year: 1341, title: "Autonomy Movement", z: -50 },
  { year: 1422, title: "Parish Independence", z: -75 },
  { year: 1541, title: "Peat Hegemony", z: -100 },
  { year: 1644, title: "City Rights", z: -125 },
  { year: 1721, title: "Schnitger Organ", z: -150 },
  { year: 1867, title: "Railway Revolution", z: -175 },
  { year: 1942, title: "Occupation Tragedy", z: -200 },
  { year: 2022, title: "Modern Healthcare", z: -225 },
];

function Tunnel() {
  return (
    <>
      {historicalYears.map((item) => (
        <TimeBlock
          key={item.year}
          position={[0, 0, item.z]}
          isActive={false}
        />
      ))}
    </>
  );
}

function CameraController() {
  useFrame(() => {
    // Camera will be controlled by GSAP scroll trigger
  });

  return null;
}

export default function TunnelScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraController />
        <Tunnel />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </Canvas>
    </div>
  );
}
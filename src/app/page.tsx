"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function IceBlock({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function TextPlane({ text, position }: { text: string; position: [number, number, number] }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, [text]);

  return (
    <mesh position={position}>
      <planeGeometry args={[4, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function Milestone({ year, title, z }: { year: number; title: string; z: number }) {
  return (
    <group position={[0, 0, z]}>
      <IceBlock position={[0, 0, 0]} />
      <TextPlane text={year.toString()} position={[0, -2, 0]} />
      <TextPlane text={title} position={[0, -2.8, 0]} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 10]} intensity={2} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Milestone year={1141} title="EPISCOPAL INCEPTION" z={0} />
      <Milestone year={1422} title="TOWER CONSTRUCTION" z={-30} />
      <Milestone year={1460} title="MARKET RIGHTS" z={-60} />
      <Milestone year={1644} title="CITY SOVEREIGNTY" z={-90} />
      <Milestone year={1742} title="JEWISH HERITAGE" z={-120} />
      <Milestone year={1867} title="THE IRON ROAD" z={-150} />
      <Milestone year={1942} title="THE GREAT VOID" z={-180} />
      <Milestone year={2026} title="PORT OF ZWOLLE" z={-210} />
    </>
  );
}

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#A0A5B1" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#A0A5B1"]} />
        <Scene />
      </Canvas>
    </div>
  );
}
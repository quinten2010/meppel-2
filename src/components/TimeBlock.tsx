"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float u_time;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.x += sin(u_time * 2.0 + position.y) * 0.02;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec3 u_color;
  varying vec2 vUv;
  void main() {
    float glitch = step(0.95, fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453123 + u_time));
    vec2 distortedUv = vUv;
    distortedUv.x += glitch * 0.1 * sin(u_time * 20.0);
    vec3 color = mix(u_color, vec3(0.7, 0.8, 1.0), 0.5);
    gl_FragColor = vec4(color, 0.4);
  }
`;

export function TimeBlock({ position, isActive = false }: { position: [number, number, number]; isActive?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = {
    u_time: { value: 0 },
    u_hover: { value: isActive ? 1 : 0 },
    u_color: { value: new THREE.Color("#383e4e") },
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform float u_intensity;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(uv, center);
    float vignette = pow(max(0.0, 1.0 - dist * 1.5), 2.0);
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233)) * 43758.5453123 + u_time * 0.5));
    float alpha = (1.0 - vignette) * u_intensity * (0.7 + noise * 0.3);
    gl_FragColor = vec4(0.7, 0.75, 0.85, alpha);
  }
`;

export function FrostVignetteMaterial() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, 1]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_intensity: { value: 0.5 },
        }}
        transparent
      />
    </mesh>
  );
}

import { useRef } from "react";
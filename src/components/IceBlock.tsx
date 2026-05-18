"use client";

import { useRef, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  uniform float u_time;
  uniform float u_hover;
  uniform vec3 u_noiseScale;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    v = mod289(v);
    vec4 i  = floor(v + dot(v, C.yyy) );
    vec3  x0 = mod289(v - i.xyz + dot(i, C.xxx) );
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod289(i);
    vec4 p = permute( permute( permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt( vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)) );
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    vec3 pos = position;
    float noise = snoise(pos * u_noiseScale + u_time * 0.5);
    float noise2 = snoise(pos * u_noiseScale * 2.0 + u_time * 0.3);
    
    float displacement = noise * 0.15 + noise2 * 0.05;
    displacement *= (1.0 + u_hover * 0.5);
    
    pos += normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform float u_hover;
  uniform vec3 u_color;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    vec3 normal = normalize(vNormal);
    float fresnel = pow(1.0 - dot(viewDir, normal), 2.0);
    
    vec3 baseColor = mix(u_color, vec3(0.9, 0.95, 1.0), 0.3);
    vec3 highlight = vec3(1.0);
    
    vec3 color = mix(baseColor, highlight, fresnel * 0.8);
    color = mix(color, u_color * 0.5, u_hover * 0.3);
    
    float alpha = 0.3 + fresnel * 0.5;
    alpha *= (0.5 + u_hover * 0.5);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

const IceMaterial = shaderMaterial(
  { u_time: 0, u_hover: 0, u_color: new THREE.Color("#b6bac5"), u_noiseScale: new THREE.Vector3(2, 2, 2) },
  vertexShader,
  fragmentShader
);

extend({ IceMaterial });

export function IceBlock({
  position,
  hover = false,
}: {
  position: [number, number, number];
  hover?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.u_hover.value = Number(hovered || hover);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[3, 3, 3]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_hover: { value: 0 },
          u_color: { value: new THREE.Color("#b6bac5") },
          u_noiseScale: { value: new THREE.Vector3(2, 2, 2) },
        }}
        transparent
      />
    </mesh>
  );
}
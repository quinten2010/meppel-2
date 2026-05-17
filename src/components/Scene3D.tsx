"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function createRandomGenerator(seed: number) {
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

function FloatingParticles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  
  const particles = useMemo(() => {
    const rand = createRandomGenerator(12345);
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 20;
      positions[i * 3 + 1] = (rand() - 0.5) * 20;
      positions[i * 3 + 2] = (rand() - 0.5) * 20;
      scales[i] = rand() * 0.5 + 0.1;
    }
    
    return { positions, scales };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4();
      const x = particles.positions[i * 3];
      const y = particles.positions[i * 3 + 1] + Math.sin(time + i) * 0.1;
      const z = particles.positions[i * 3 + 2];
      
      matrix.setPosition(x, y, z);
      mesh.current.setMatrixAt(i, matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function FloatingSphere() {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = time * 0.2;
    mesh.current.rotation.y = time * 0.3;
    mesh.current.position.y = Math.sin(time) * 0.2;
  });

  return (
    <Sphere args={[2, 64, 64]} ref={mesh}>
      <MeshDistortMaterial
        color="#6366f1"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.4}
      />
    </Sphere>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <FloatingSphere />
      <FloatingParticles />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
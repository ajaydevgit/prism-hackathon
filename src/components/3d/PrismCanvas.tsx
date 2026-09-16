"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DynamicPrism({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5 + scrollY * 0.005;
      meshRef.current.rotation.x = time * 0.25 + scrollY * 0.003;
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.2 + scrollY * 0.0015;

      const scaleFactor = 1.9 + Math.sin(scrollY * 0.002) * 0.25;
      meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -time * 0.3 - scrollY * 0.004;
      wireframeRef.current.rotation.x = time * 0.35 + scrollY * 0.002;
      const wireScale = (1.9 + Math.sin(scrollY * 0.002) * 0.25) * 1.05;
      wireframeRef.current.scale.set(wireScale, wireScale, wireScale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Solid Inner Prism */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.1}
          metalness={0.9}
          emissive="#5b21b6"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Wireframe Outer Facet Layer */}
      <mesh ref={wireframeRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#c4b5fd"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

function FloatingRings({ scrollY }: { scrollY: number }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4 + scrollY * 0.0035;
      ring1Ref.current.rotation.y = time * 0.35;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.3 - scrollY * 0.0025;
      ring2Ref.current.rotation.y = time * 0.5 + scrollY * 0.0045;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.3 + scrollY * 0.003;
      ring3Ref.current.rotation.x = time * 0.2;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.9}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.1, 0.014, 16, 100]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a78bfa"
          emissiveIntensity={0.7}
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[3.6, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
}

export default function PrismCanvas({ scrollY = 0 }: { scrollY?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#c084fc" />
      <pointLight position={[-5, -4, 4]} intensity={1.8} color="#38bdf8" />
      <pointLight position={[4, -5, -3]} intensity={1.2} color="#a855f7" />
      <pointLight position={[0, 0, 8]} intensity={1.0} color="#ffffff" />
      <DynamicPrism scrollY={scrollY} />
      <FloatingRings scrollY={scrollY} />
    </Canvas>
  );
}

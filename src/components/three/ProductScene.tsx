"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// ─── Individual product 3D tile ───────────────────────────────────────────────
function ProductTile({
  position,
  color,
  isActive,
  index,
}: {
  position: [number, number, number];
  color: string;
  isActive: boolean;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetY = isActive ? Math.sin(t * 1.5 + index) * 0.08 + 0.15 : 0;
    const targetScale = isActive ? 1.06 : 1.0;
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.06);
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.06)
    );
    meshRef.current.rotation.y += isActive ? 0.005 : 0.001;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <RoundedBox args={[0.7, 0.9, 0.12]} radius={0.04} smoothness={4}>
        <meshStandardMaterial
          color={isActive ? "#C8A96E" : "#1A1A1A"}
          metalness={isActive ? 0.9 : 0.7}
          roughness={isActive ? 0.05 : 0.3}
          envMapIntensity={1.2}
        />
      </RoundedBox>
    </mesh>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ProductScene({ activeIndex = 0 }: { activeIndex?: number }) {
  const positions: [number, number, number][] = [
    [-2.4, 0, 0],
    [-0.8, 0, 0],
    [0.8, 0, 0],
    [2.4, 0, 0],
  ];

  const colors = ["#1A1A1A", "#1A1A1A", "#1A1A1A", "#1A1A1A"];

  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[4, 6, 4]} intensity={2} color="#F2F0EB" castShadow />
        <directionalLight position={[-4, -2, -4]} intensity={0.6} color="#C8A96E" />
        <pointLight position={[0, 2, 3]} intensity={0.8} color="#C8A96E" />

        {positions.map((pos, i) => (
          <ProductTile
            key={i}
            position={pos}
            color={colors[i]}
            isActive={i === activeIndex}
            index={i}
          />
        ))}

        <Environment preset="warehouse" environmentIntensity={0.4} />
      </Suspense>
    </Canvas>
  );
}

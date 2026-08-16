"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STEPS = [
  { label: "Materials", color: "#3A3A3A", shape: "box" },
  { label: "Processing", color: "#4A4A4A", shape: "cylinder" },
  { label: "Quality Control", color: "#5A5A5A", shape: "sphere" },
  { label: "Testing", color: "#7A6A4A", shape: "torus" },
  { label: "Final Product", color: "#C8A96E", shape: "box" },
];

function ProcessNode({
  position,
  step,
  index,
  activeStep,
}: {
  position: [number, number, number];
  step: (typeof STEPS)[0];
  index: number;
  activeStep: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isActive = index === activeStep;
  const isPast = index < activeStep;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isActive) {
      meshRef.current.rotation.y += 0.012;
      meshRef.current.rotation.x = Math.sin(t * 1.2 + index) * 0.15;
    }
    const targetScale = isActive ? 1.3 : isPast ? 0.8 : 0.9;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05)
    );
  });

  const geometry =
    step.shape === "sphere" ? (
      <sphereGeometry args={[0.35, 32, 32]} />
    ) : step.shape === "cylinder" ? (
      <cylinderGeometry args={[0.25, 0.25, 0.6, 32]} />
    ) : step.shape === "torus" ? (
      <torusGeometry args={[0.28, 0.1, 12, 32]} />
    ) : (
      <boxGeometry args={[0.55, 0.55, 0.55]} />
    );

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color={isActive ? "#C8A96E" : isPast ? "#3A3A3A" : "#2A2A2A"}
        metalness={0.85}
        roughness={isActive ? 0.05 : 0.4}
        emissive={isActive ? "#C8A96E" : "#000000"}
        emissiveIntensity={isActive ? 0.25 : 0}
      />
    </mesh>
  );
}

function ConnectorLine({
  from,
  to,
  active,
}: {
  from: [number, number, number];
  to: [number, number, number];
  active: boolean;
}) {
  const length = Math.abs(to[0] - from[0]);
  const midX = (from[0] + to[0]) / 2;

  return (
    <mesh position={[midX, 0, 0]}>
      <boxGeometry args={[length, 0.015, 0.015]} />
      <meshBasicMaterial color={active ? "#C8A96E" : "#2A2A2A"} />
    </mesh>
  );
}

export default function ProcessScene({ activeStep = 0 }: { activeStep?: number }) {
  const spacing = 2.2;
  const startX = -((STEPS.length - 1) * spacing) / 2;

  const positions: [number, number, number][] = STEPS.map((_, i) => [
    startX + i * spacing,
    0,
    0,
  ]);

  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.12} />
        <directionalLight position={[0, 6, 4]} intensity={1.8} color="#F2F0EB" />
        <pointLight position={[0, 2, 2]} intensity={1.0} color="#C8A96E" />

        {STEPS.map((step, i) => (
          <ProcessNode
            key={i}
            position={positions[i]}
            step={step}
            index={i}
            activeStep={activeStep}
          />
        ))}

        {positions.slice(0, -1).map((pos, i) => (
          <ConnectorLine
            key={i}
            from={[pos[0] + 0.4, 0, 0]}
            to={[positions[i + 1][0] - 0.4, 0, 0]}
            active={i < activeStep}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}

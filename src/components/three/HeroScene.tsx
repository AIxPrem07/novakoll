"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Industrial precision object ─────────────────────────────────────────────
function PrecisionObject({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Slow base rotation
    groupRef.current.rotation.y = t * 0.12;
    groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;

    // Mouse parallax
    const [mx, my] = mouse.current;
    groupRef.current.rotation.y += mx * 0.3;
    groupRef.current.rotation.x += my * 0.2;

    // Inner sphere pulse
    if (innerRef.current) {
      const scale = 1 + Math.sin(t * 1.2) * 0.04;
      innerRef.current.scale.setScalar(scale);
    }

    // Ring counter rotation
    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.4;
    if (ringRef2.current) ringRef2.current.rotation.x = t * -0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Outer torus */}
      <mesh ref={torusRef}>
        <torusGeometry args={[1.8, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#C8A96E"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Second torus — perpendicular */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.04, 12, 80]} />
        <meshStandardMaterial
          color="#6A6A6A"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef1} rotation={[0.8, 0, 0]}>
        <torusGeometry args={[2.4, 0.02, 8, 60]} />
        <meshStandardMaterial
          color="#3A3A3A"
          metalness={1.0}
          roughness={0.0}
        />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ringRef2} rotation={[0, 0.5, 1.2]}>
        <torusGeometry args={[2.8, 0.015, 8, 60]} />
        <meshStandardMaterial
          color="#2A2A2A"
          metalness={1.0}
          roughness={0.0}
        />
      </mesh>

      {/* Inner precision sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <MeshDistortMaterial
          color="#1A1A1A"
          metalness={0.8}
          roughness={0.15}
          distort={0.15}
          speed={1.5}
          envMapIntensity={1.0}
        />
      </mesh>

      {/* Precision detail — small spheres on ring */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#C8A96E"
              metalness={1.0}
              roughness={0.0}
              emissive="#C8A96E"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── Scene lighting ───────────────────────────────────────────────────────────
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#F2F0EB" castShadow />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#C8A96E" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#C8A96E" />
      <pointLight position={[0, -4, 0]} intensity={0.3} color="#3A3A3A" />
    </>
  );
}

// ─── Mouse tracker ────────────────────────────────────────────────────────────
function MouseTracker({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { viewport } = useThree();
  useFrame(({ pointer }) => {
    mouse.current = [
      (pointer.x * viewport.width) / 2 / 100,
      (pointer.y * viewport.height) / 2 / 100,
    ];
  });
  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function HeroScene() {
  const mouse = useRef<[number, number]>([0, 0]);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      aria-hidden="true"
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <MouseTracker mouse={mouse} />
        <SceneLighting />
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <PrecisionObject mouse={mouse} />
        </Float>
        <Environment preset="city" environmentIntensity={0.3} />
      </Suspense>
    </Canvas>
  );
}

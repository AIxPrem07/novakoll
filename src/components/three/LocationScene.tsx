"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

// ─── Glowing location marker ──────────────────────────────────────────────────
function LocationMarker() {
  const markerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Pulse marker
    if (markerRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.12;
      markerRef.current.scale.setScalar(s);
    }

    // Expand rings outward
    if (ring1Ref.current) {
      const s = 1 + (((t * 0.5) % 1) * 2.0);
      ring1Ref.current.scale.setScalar(s);
      (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity =
        1 - (t * 0.5) % 1;
    }
    if (ring2Ref.current) {
      const offset = 0.5;
      const s = 1 + (((t * 0.5 + offset) % 1) * 2.0);
      ring2Ref.current.scale.setScalar(s);
      (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity =
        1 - ((t * 0.5 + offset) % 1);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Vertical beam */}
      <mesh ref={beamRef} position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.006, 0.001, 2.4, 8]} />
        <meshBasicMaterial color="#C8A96E" transparent opacity={0.6} />
      </mesh>

      {/* Sphere core */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#C8A96E"
          emissive="#C8A96E"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Expanding ring 1 */}
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.22, 32]} />
        <meshBasicMaterial
          color="#C8A96E"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Expanding ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.22, 32]} />
        <meshBasicMaterial
          color="#C8A96E"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── Drifting camera ──────────────────────────────────────────────────────────
function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.12) * 0.8;
    state.camera.position.y = 2.5 + Math.sin(t * 0.08) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function LocationScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 4.5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <CameraDrift />
        <ambientLight intensity={0.05} />
        <pointLight position={[0, 3, 0]} intensity={1.5} color="#C8A96E" />
        <pointLight position={[3, 1, 3]} intensity={0.3} color="#F2F0EB" />

        {/* Terrain grid */}
        <Grid
          args={[20, 20]}
          cellSize={0.8}
          cellThickness={0.3}
          cellColor="#2A2A2A"
          sectionSize={4}
          sectionThickness={0.6}
          sectionColor="#C8A96E"
          fadeDistance={14}
          fadeStrength={1.5}
          position={[0, -0.01, 0]}
        />

        <LocationMarker />
      </Suspense>
    </Canvas>
  );
}

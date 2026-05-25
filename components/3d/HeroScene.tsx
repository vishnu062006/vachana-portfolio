'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <group>
        {/* Main solid shape */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.15}
            roughness={0.4}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh ref={wireframeRef} scale={1.02}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshBasicMaterial
            color="#a855f7"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh scale={0.6}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <MeshWobbleMaterial
            color="#06b6d4"
            emissive="#a855f7"
            emissiveIntensity={0.3}
            transparent
            opacity={0.08}
            factor={0.5}
            speed={1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitalRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

function Particles({ count = 50 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#06b6d4"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#a855f7" />

        <FloatingGeometry />
        <OrbitalRing radius={3} speed={0.3} color="#06b6d4" />
        <OrbitalRing radius={3.5} speed={-0.2} color="#a855f7" />
        <Particles count={40} />
      </Canvas>
    </div>
  );
}

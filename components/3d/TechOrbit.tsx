'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { techStackItems } from '@/data/portfolio';

function TechNode({
  position,
  label,
  color,
}: {
  position: [number, number, number];
  label: string;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.8}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.12}
          color="#e5e7eb"
          anchorX="center"
          anchorY="top"
          font="/fonts/inter.woff"
          maxWidth={1}
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function OrbitPath({ radius, tilt }: { radius: number; tilt: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * Math.sin(tilt),
          Math.sin(angle) * radius * Math.cos(tilt)
        )
      );
    }
    return pts;
  }, [radius, tilt]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.1} />
    </line>
  );
}

function CenterCore() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={coreRef}>
      <dodecahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#a855f7"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export default function TechOrbit() {
  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = techStackItems.length;
    const layers = 3;

    for (let i = 0; i < count; i++) {
      const layer = i % layers;
      const radius = 1.8 + layer * 0.8;
      const angleStep = (2 * Math.PI) / Math.ceil(count / layers);
      const indexInLayer = Math.floor(i / layers);
      const angle = indexInLayer * angleStep + (layer * Math.PI) / 6;

      positions.push([
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * radius,
      ]);
    }
    return positions;
  }, []);

  const colors = ['#06b6d4', '#a855f7', '#22d3ee', '#c084fc', '#67e8f9'];

  return (
    <div className="w-full h-[500px] lg:h-[600px]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#06b6d4" />
        <pointLight position={[-5, -5, -3]} intensity={0.3} color="#a855f7" />

        <CenterCore />

        {techStackItems.map((tech, i) => (
          <TechNode
            key={tech}
            position={nodePositions[i] || [0, 0, 0]}
            label={tech}
            color={colors[i % colors.length]}
          />
        ))}

        <OrbitPath radius={1.8} tilt={0.3} />
        <OrbitPath radius={2.6} tilt={-0.5} />
        <OrbitPath radius={3.4} tilt={0.8} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

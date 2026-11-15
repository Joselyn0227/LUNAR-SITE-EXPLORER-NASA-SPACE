import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface OrbitRingProps {
  radius: number;
  tilt?: [number, number, number];
  speed?: number; // radianes por segundo (0 = quieto)
  phase?: number;
  opacity?: number;
  dotSize?: number;
}

export default function OrbitRing({
  radius,
  tilt = [1.2, 0, 0],
  speed = 0.1,
  phase = 0,
  opacity = 0.35,
  dotSize = 0.022,
}: OrbitRingProps) {
  const dot = useRef<THREE.Mesh>(null);

  const points = useMemo(
    () =>
      Array.from({ length: 129 }, (_, i) => {
        const a = (i / 128) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius);
      }),
    [radius]
  );

  useFrame(({ clock }) => {
    if (!dot.current) return;
    const a = phase + clock.elapsedTime * speed;
    dot.current.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  });

  return (
    <group rotation={tilt}>
      <Line points={points} color="#8ccfff" lineWidth={1} transparent opacity={opacity} />
      <mesh ref={dot}>
        <sphereGeometry args={[dotSize, 16, 16]} />
        <meshBasicMaterial color="#cdeaff" toneMapped={false} />
      </mesh>
    </group>
  );
}
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MOON_BUMP_MAP, MOON_COLOR_MAP, MOON_RADIUS } from "./moonConfig";
import { createProceduralMoonTexture } from "./proceduralMoon";

type Vec3 = [number, number, number];

function ProceduralSurface() {
  const texture = useMemo(() => createProceduralMoonTexture(), []);
  return <meshStandardMaterial map={texture} bumpMap={texture} bumpScale={1} roughness={1} />;
}

function TexturedSurface({ colorUrl, bumpUrl }: { colorUrl: string; bumpUrl: string | null }) {
  const [color, bump] = useTexture(bumpUrl ? [colorUrl, bumpUrl] : [colorUrl]);
  return <meshStandardMaterial map={color} bumpMap={bump} bumpScale={3} roughness={1} />;
}

// Halo: más brillante cerca del borde de la Luna y del lado de la luz
const glowVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLight;
  uniform float uStrength;
  varying vec3 vNormal;
  void main() {
    float rim = pow(clamp(-vNormal.z * 1.7, 0.0, 1.0), 2.6);
    vec2 dir = normalize(vNormal.xy + vec2(0.0001));
    float lit = 0.2 + 0.8 * smoothstep(-0.5, 0.9, dot(dir, normalize(uLight.xy)));
    gl_FragColor = vec4(uColor * rim * lit * uStrength, 1.0);
  }
`;

interface MoonBodyProps {
  lightDirection: Vec3;
  spin?: number; // radianes por segundo (0 = quieta)
  glowColor?: string;
  glowStrength?: number;
}

export default function MoonBody({
  lightDirection,
  spin = 0.03,
  glowColor = "#4aa8e8",
  glowStrength = 1.1,
}: MoonBodyProps) {
  const spinRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (spinRef.current && spin) spinRef.current.rotation.y += delta * spin;
  });

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(glowColor) },
      uLight: { value: new THREE.Vector3(...lightDirection) },
      uStrength: { value: glowStrength },
    }),
    [glowColor, lightDirection, glowStrength]
  );

  return (
    <group>
      {/* Inclinación del eje, como en el mockup */}
      <group rotation={[0.12, 0, -0.1]}>
        <group ref={spinRef}>
          <mesh>
            <sphereGeometry args={[MOON_RADIUS, 128, 128]} />
            {MOON_COLOR_MAP ? (
              <TexturedSurface colorUrl={MOON_COLOR_MAP} bumpUrl={MOON_BUMP_MAP} />
            ) : (
              <ProceduralSurface />
            )}
          </mesh>
        </group>
      </group>

      <mesh scale={1.16}>
        <sphereGeometry args={[MOON_RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          uniforms={uniforms}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
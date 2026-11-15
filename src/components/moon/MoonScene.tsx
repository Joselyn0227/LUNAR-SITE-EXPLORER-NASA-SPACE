import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import MoonBody from "./MoonBody";
import OrbitRing from "./OrbitRing";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import styles from "./MoonScene.module.css";

export type MoonLayout = "hero" | "challenge" | "solution" | "demo";

// Luz desde arriba a la izquierda: da el borde brillante del mockup
const LIGHT: [number, number, number] = [-4, 3, 3];

function Composition({ layout, animate }: { layout: MoonLayout; animate: boolean }) {
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const mobile = size.width < 860;

  let scale: number;
  let x: number;
  let y: number;

  if (layout === "hero") {
    if (mobile) {
      scale = viewport.width * 0.5;
      x = viewport.width * 0.12;
      y = -viewport.height * 0.18;
    } else {
      scale = viewport.height * 0.42;
      x = viewport.width * 0.2;
      y = 0;
    }
  } else if (layout === "demo") {
    scale = viewport.height * 0.34;
    x = 0;
    y = 0;
  } else if (layout === "solution" && mobile) {
    scale = viewport.width * 0.44;
    x = -viewport.width * 0.1;
    y = 0;
  } else if (layout === "solution") {
    scale = viewport.height * 0.6;
    x = -viewport.width * 0.24;
    y = -viewport.height * 0.1;
  } else if (mobile) {
    scale = viewport.width * 0.44;
    x = 0;
    y = 0;
  } else {
    scale = viewport.height * 0.6;
    x = viewport.width * 0.24;
    y = -viewport.height * 0.1;
  }

  return (
    <group position={[x, y, 0]} scale={scale}>
      <MoonBody lightDirection={LIGHT} spin={animate ? 0.03 : 0} />
      <OrbitRing radius={1.45} tilt={[1.28, 0.1, 0.2]} speed={animate ? 0.12 : 0} phase={0.5} />
      {layout === "hero" && (
        <OrbitRing
          radius={1.85}
          tilt={[1.38, 0, -0.25]}
          speed={animate ? -0.07 : 0}
          phase={2.2}
          opacity={0.22}
        />
      )}
    </group>
  );
}

export default function MoonScene({ layout, animate = true }: { layout: MoonLayout; animate?: boolean }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={styles.scene} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={LIGHT} intensity={2.8} color="#f4f8ff" />
        <directionalLight position={[4, -2, -3]} intensity={0.6} color="#3a78c8" />
        <Suspense fallback={null}>
          <Stars radius={80} depth={50} count={2500} factor={3.5} saturation={0} fade speed={reduced ? 0 : 0.6} />
          <Composition layout={layout} animate={animate && !reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
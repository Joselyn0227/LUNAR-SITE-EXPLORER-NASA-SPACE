import * as THREE from "three";

// Generador pseudoaleatorio con semilla: la Luna se ve igual en cada carga
function createRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createProceduralMoonTexture(width = 2048): THREE.CanvasTexture {
  const height = width / 2;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = createRandom(1969);

  ctx.fillStyle = "#858585";
  ctx.fillRect(0, 0, width, height);

  // Mares: manchas oscuras grandes y suaves
  for (let i = 0; i < 22; i++) {
    const x = rand() * width;
    const y = height * (0.2 + rand() * 0.6);
    const r = width * (0.03 + rand() * 0.07);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(45,45,50,0.55)");
    g.addColorStop(1, "rgba(45,45,50,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Cráteres: interior oscuro y borde claro
  for (let i = 0; i < 1800; i++) {
    const r = 2 + Math.pow(rand(), 3.2) * width * 0.03;
    const x = rand() * width;
    const y = rand() * height;
    const g = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    g.addColorStop(0, "rgba(0,0,0,0.30)");
    g.addColorStop(0.72, "rgba(0,0,0,0.12)");
    g.addColorStop(0.9, "rgba(255,255,255,0.30)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Grano fino
  const image = ctx.getImageData(0, 0, width, height);
  const d = image.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() - 0.5) * 28;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}
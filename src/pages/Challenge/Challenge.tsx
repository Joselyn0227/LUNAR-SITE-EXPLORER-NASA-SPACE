import { ArrowRight, Sun, Wifi } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { GlassCard } from "../../components/ui/GlassCard";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { StatCard } from "../../components/ui/StatCard";
import MoonScene from "../../components/moon/MoonScene";
import styles from "./Challenge.module.css";

const LOREM_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const LOREM_2 =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.";

const factors = [
  {
    icon: <Sun size={22} />,
    title: "Posición del Sol",
    text: "Determina la disponibilidad de energía para los paneles solares y las condiciones térmicas.",
  },
  {
    icon: <Wifi size={22} />,
    title: "Posición de la Tierra",
    text: "Afecta la posibilidad de mantener comunicaciones directas.",
  },
];

const importance = [
  { value: "+10", text: "misiones lunares planeadas (2030+)" },
  { value: "2", text: "factores críticos (Sol y Tierra)" },
  { value: "1", text: "herramienta integral" },
];

export default function Challenge() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.copy} anim-fade-up`}>
          <SectionLabel>El reto</SectionLabel>
          <h1 className={styles.title}>Lunar Landing Site Navigator</h1>

          <div className={styles.statement}>
            <SectionLabel>Problem statement</SectionLabel>
            <p>{LOREM_1}</p>
          </div>

          <ul className={styles.factors}>
            {factors.map((f) => (
              <li key={f.title} className={styles.factor}>
                <span className={styles.factorIcon}>{f.icon}</span>
                <div>
                  <h2 className={styles.factorTitle}>{f.title}</h2>
                  <p className={styles.factorText}>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.note}>{LOREM_2}</p>

          <Button to="/solucion" variant="outline" icon={<ArrowRight size={16} />}>
            Ver la solución
          </Button>
        </div>

        <div className={styles.moon}>
          <MoonScene layout="challenge" />
          <span className={styles.reticle} aria-hidden="true" />
        </div>

        <aside className={styles.side}>
          <div className={styles.coords}>
            <StatCard label="Región polo sur" value="89.9° S · 0.0° E" />
            <StatCard label="Altitud promedio" value="-2,000 m" />
          </div>

          <GlassCard className={styles.importance}>
            <h2 className={styles.importanceTitle}>Importancia del reto</h2>
            <ul className={styles.importanceList}>
              {importance.map((item) => (
                <li key={item.value}>
                  <span className={styles.num}>{item.value}</span>
                  <span className={styles.numText}>{item.text}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </aside>
      </div>
    </section>
  );
}
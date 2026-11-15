import { ArrowRight, Globe2, MapPinned, Sun } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { GlassCard } from "../../components/ui/GlassCard";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { StatCard } from "../../components/ui/StatCard";
import MoonScene from "../../components/moon/MoonScene";
import styles from "./Solution.module.css";

const capabilities = [
  {
    icon: <Sun size={20} />,
    title: "Luz solar",
    text: "Considera la posición del Sol para entender la disponibilidad de energía en cada zona.",
  },
  {
    icon: <Globe2 size={20} />,
    title: "Comunicación con la Tierra",
    text: "Tiene en cuenta la visibilidad de la Tierra como un factor para mantener el contacto.",
  },
  {
    icon: <MapPinned size={20} />,
    title: "Exploración de sitios",
    text: "Reúne los factores clave en una experiencia para explorar y comparar posibles lugares de aterrizaje.",
  },
];

export default function Solution() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.copy} anim-fade-up`}>
          <SectionLabel>La solución</SectionLabel>
          <h1 className={styles.title}>Explora el mejor lugar para aterrizar</h1>

          <div className={styles.statement}>
            <SectionLabel>Lunar Site Explorer</SectionLabel>
            <p>
              Una herramienta visual para explorar posibles sitios de aterrizaje en el polo sur lunar.
              Integra la posición del Sol y de la Tierra para ayudar a comparar las condiciones de cada zona.
            </p>
          </div>

          <ul className={styles.capabilities}>
            {capabilities.map((capability) => (
              <li key={capability.title} className={styles.capability}>
                <span className={styles.capabilityIcon}>{capability.icon}</span>
                <div>
                  <h2 className={styles.capabilityTitle}>{capability.title}</h2>
                  <p className={styles.capabilityText}>{capability.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Button to="/demo" variant="outline" icon={<ArrowRight size={16} />}>
            Explorar la demostración
          </Button>
        </div>

        <div className={styles.moon}>
          <MoonScene layout="solution" />
          <span className={styles.reticle} aria-hidden="true" />
        </div>

        <aside className={styles.side}>
          <div className={styles.coords}>
            <StatCard label="Zona de interés" value="Polo sur lunar" />
            <StatCard label="Criterios de análisis" value="Sol · Tierra" />
          </div>

          <GlassCard className={styles.summary} glow>
            <SectionLabel>Explora · Analiza · Compara</SectionLabel>
            <h2 className={styles.summaryTitle}>Una vista integral del entorno lunar</h2>
            <p className={styles.summaryText}>
              Consulta la superficie lunar y considera las condiciones que pueden influir en una misión.
            </p>
            <div className={styles.signal} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <span className={styles.signalLabel}>NAVEGACIÓN LUNAR / 01</span>
          </GlassCard>
        </aside>
      </div>
    </section>
  );
}

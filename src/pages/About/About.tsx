import { ArrowRight, Orbit, Rocket, Telescope } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { GlassCard } from "../../components/ui/GlassCard";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { StatCard } from "../../components/ui/StatCard";
import MoonScene from "../../components/moon/MoonScene";
import styles from "./About.module.css";

const principles = [
  {
    icon: <Telescope size={20} />,
    title: "Explorar",
    text: "Acercar la exploración del polo sur lunar a través de una experiencia visual e interactiva.",
  },
  {
    icon: <Orbit size={20} />,
    title: "Conectar factores",
    text: "Poner en contexto la posición del Sol y de la Tierra al evaluar posibles zonas de aterrizaje.",
  },
];

export default function About() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.copy} anim-fade-up`}>
          <SectionLabel>Acerca del proyecto</SectionLabel>
          <h1 className={styles.title}>Una mirada más clara al polo sur lunar</h1>

          <div className={styles.statement}>
            <SectionLabel>Astronomía del María 1</SectionLabel>
            <p>
              Lunar Site Explorer es un proyecto creado para el NASA Space Apps Challenge 2026.
              Nace con una meta: facilitar la exploración de posibles sitios de aterrizaje y mostrar
              por qué el entorno lunar importa al planear una misión.
            </p>
          </div>

          <ul className={styles.principles}>
            {principles.map((principle) => (
              <li key={principle.title} className={styles.principle}>
                <span className={styles.principleIcon}>{principle.icon}</span>
                <div>
                  <h2 className={styles.principleTitle}>{principle.title}</h2>
                  <p className={styles.principleText}>{principle.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Button to="/solucion" variant="outline" icon={<ArrowRight size={16} />}>
            Conoce la solución
          </Button>
        </div>

        <div className={styles.moon}>
          <MoonScene layout="challenge" />
          <span className={styles.reticle} aria-hidden="true" />
        </div>

        <aside className={styles.side}>
          <div className={styles.coords}>
            <StatCard label="Equipo" value="Astronomía del María 1" />
            <StatCard label="Contexto" value="NASA Space Apps 2026" />
          </div>

          <GlassCard className={styles.projectCard} glow>
            <span className={styles.rocketIcon}><Rocket size={20} /></span>
            <SectionLabel>Nuestra misión</SectionLabel>
            <h2 className={styles.projectTitle}>Descubrir nuevos horizontes</h2>
            <p className={styles.projectText}>
              Una herramienta que une ciencia, visualización y curiosidad para pensar el futuro de la exploración lunar.
            </p>
            <div className={styles.projectFooter}>
              <span className={styles.statusDot} />
              <span>EXPLORACIÓN LUNAR</span>
            </div>
          </GlassCard>
        </aside>
      </div>
    </section>
  );
}

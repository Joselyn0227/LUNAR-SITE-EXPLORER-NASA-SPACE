import { ArrowRight, Play, Rocket } from "lucide-react";
import { Button } from "../../components/ui/Button";
import MoonScene from "../../components/moon/MoonScene";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      <MoonScene layout="hero" />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.copy}>
          {/* Para quitar la etiqueta, borra esta línea */}
          <span className={`${styles.eyebrow} anim-fade-up`}>Astronomía del María 1</span>

          <h1 className={`${styles.title} anim-fade-up`} style={{ animationDelay: "80ms" }}>
            <span className={styles.line}>LUNAR SITE</span>
            <span className={`${styles.line} ${styles.accent}`}>EXPLORER</span>
          </h1>

          <p className={`${styles.lead} anim-fade-up`} style={{ animationDelay: "160ms" }}>
            Una herramienta para encontrar y comparar los mejores sitios de{" "}
            <strong>aterrizaje</strong> en el polo sur lunar, considerando la{" "}
            <strong>posición del Sol</strong> y la Tierra.
          </p>

          <div className={`${styles.badge} anim-fade-up`} style={{ animationDelay: "240ms" }}>
            <span className={styles.badgeIcon}>
              <Rocket size={18} />
            </span>
            <div className={styles.badgeText}>
              <span className={styles.badgeTitle}>NASA Space Apps Challenge 2026</span>
              <span className={styles.chip}>Lunar Landing Site Navigator</span>
            </div>
          </div>

          <div className={`${styles.actions} anim-fade-up`} style={{ animationDelay: "320ms" }}>
            <Button to="/reto" variant="outline" icon={<ArrowRight size={16} />}>
              Conoce el reto
            </Button>
            <Button to="/demo" variant="ghost" iconPosition="left" icon={<Play size={14} />}>
              Ver demostración
            </Button>
          </div>
        </div>

        <p className={styles.vertical} aria-hidden="true">
          Mejores decisiones para un futuro lunar
        </p>
      </div>

      <div className={`container ${styles.strip}`}>
        <span className={styles.stripText}>Astronomía del María 1 — Lunar Site Explorer</span>
        <div className={styles.pager}>
          <span className={styles.bars} aria-hidden="true">
            <span className={styles.on} />
            <span />
            <span />
          </span>
          <span>01 / 03</span>
        </div>
      </div>
    </section>
  );
}
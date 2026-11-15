import { useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronRight, Sun, Thermometer, Wifi } from "lucide-react";
import type { LunarSite } from "../../../data/mockSites";
import styles from "./DetailsPanel.module.css";

export type DetailTab = "summary" | "energy" | "communications";

interface DetailsPanelProps {
  site: LunarSite;
  tab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
}

const tabs: { value: DetailTab; label: string }[] = [
  { value: "summary", label: "Resumen" },
  { value: "energy", label: "Energía" },
  { value: "communications", label: "Comunicaciones" },
];

export default function DetailsPanel({ site, tab, onTabChange }: DetailsPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const scoreRows = [
    ["Energía", site.scores.energy],
    ["Comunicaciones", site.scores.communications],
    ["Estabilidad térmica", site.scores.stability],
    ["Accesibilidad", site.scores.accessibility],
  ] as const;
  const overallScore = Math.round(Object.values(site.scores).reduce((sum, score) => sum + score, 0) / 4);

  return (
    <aside className={styles.panel} aria-label={`Detalles de ${site.name}`}>
      <header className={styles.siteHeader}>
        <span className={styles.siteIcon} />
        <div className={styles.titleCopy}>
          <h2>{site.name}</h2>
          <p>{site.coordinates}</p>
        </div>
        <span className={`${styles.badge} ${styles[site.status]}`}>
          {site.status === "excellent" ? "Excelente" : site.status === "good" ? "Bueno" : "Revisar"}
        </span>
      </header>

      <nav className={styles.tabs} aria-label="Información del sitio">
        {tabs.map((item) => (
          <button
            type="button"
            key={item.value}
            className={tab === item.value ? styles.tabActive : ""}
            onClick={() => onTabChange(item.value)}
            aria-current={tab === item.value ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className={styles.content}>
        {tab === "summary" && (
          <>
            <section className={styles.infoSection}>
              <h3>Condiciones de luz</h3>
              <div className={styles.sunRow}>
                <div className={styles.bars} aria-label={`${site.sunlight}% de iluminación solar`}>
                  {Array.from({ length: 22 }, (_, index) => (
                    <i key={index} style={{ height: `${18 + ((index * 37 + site.sunlight) % 70)}%` }} />
                  ))}
                </div>
                <div className={styles.sunValue}><strong>{site.sunlight}%</strong><small>Iluminación solar</small></div>
              </div>
              <div className={styles.metric}><span><Thermometer size={13} /> Térmico</span><strong>{site.temperature}</strong></div>
            </section>
            <section className={styles.infoSection}>
              <h3>Comunicaciones con la Tierra</h3>
              <div className={styles.signal}>
                {Array.from({ length: 28 }, (_, index) => <i key={index} />)}
              </div>
              <div className={styles.splitMetric}>
                <span>Tiempo de enlace<strong>{site.communicationDelay}</strong></span>
                <span>Señal estimada<strong className={styles.goodSignal}>{site.signal}% · Alta</strong></span>
              </div>
            </section>
          </>
        )}
        {tab === "energy" && (
          <section className={styles.infoSection}>
            <h3><Sun size={13} /> Potencial energético</h3>
            <div className={styles.energyValue}>{site.sunlight}<small>%</small></div>
            <p className={styles.description}>Iluminación solar estimada en la zona de aterrizaje. Los valores son ilustrativos para esta demo.</p>
            <div className={styles.metric}><span>Exposición solar</span><strong>{site.sunlight}%</strong></div>
          </section>
        )}
        {tab === "communications" && (
          <section className={styles.infoSection}>
            <h3><Wifi size={13} /> Enlace con la Tierra</h3>
            <div className={styles.signal}>
              {Array.from({ length: 28 }, (_, index) => <i key={index} />)}
            </div>
            <div className={styles.metric}><span>Señal estimada</span><strong>{site.signal}% · Alta</strong></div>
            <div className={styles.metric}><span>Tiempo de enlace</span><strong>{site.communicationDelay}</strong></div>
          </section>
        )}

        <section className={styles.evaluation}>
          <div className={styles.evaluationTitle}><h3>Evaluación general</h3><span><Check size={12} /> AI</span></div>
          <div className={styles.scores}>
            <div
              className={styles.scoreRing}
              style={{ background: `conic-gradient(#62ddc5 0 ${overallScore}%, rgba(78, 124, 145, 0.18) ${overallScore}%)` }}
            >
              <strong>{overallScore}%</strong>
            </div>
            <div className={styles.scoreList}>
              {scoreRows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}%</strong></div>)}
            </div>
          </div>
        </section>

        {expanded && (
          <p className={styles.description}>
            {site.name} se presenta como candidato de exploración en esta demostración. La evaluación combina luz, comunicaciones, temperatura y accesibilidad.
          </p>
        )}
        <button type="button" className={styles.detailsButton} onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Ocultar detalles" : "Ver detalles"} {expanded ? <ChevronDown size={16} /> : <ArrowRight size={16} />}
        </button>
        <button type="button" className={styles.coordinatesButton} onClick={() => onTabChange("summary")}>
          <span>Coordenadas del sitio</span><strong>{site.coordinates}</strong><ChevronRight size={14} />
        </button>
      </div>
    </aside>
  );
}
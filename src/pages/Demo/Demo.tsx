import { useState } from "react";
import { Activity, Crosshair, LocateFixed, Minus, Plus } from "lucide-react";
import MoonScene from "../../components/moon/MoonScene";
import MoonFlat from "../../components/moon/MoonFlat";
import { mockSites } from "../../data/mockSites";
import DetailsPanel, { type DetailTab } from "../../features/demo/DetailsPanel/DetailsPanel";
import SitesPanel, { type SiteFilter } from "../../features/demo/SitesPanel/SitesPanel";
import ViewControls, { type MoonView } from "../../features/demo/ViewControls/ViewControls";
import styles from "./Demo.module.css";

export default function Demo() {
  const [selectedId, setSelectedId] = useState(mockSites[0].id);
  const [filter, setFilter] = useState<SiteFilter>("all");
  const [view, setView] = useState<MoonView>("3D");
  const [ground, setGround] = useState(false);
  const [live, setLive] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [tab, setTab] = useState<DetailTab>("summary");
  const selectedSite = mockSites.find((site) => site.id === selectedId) ?? mockSites[0];
  const visibleSites = mockSites.filter((site) => filter === "all" || site.kind === filter);

  function handleFilterChange(nextFilter: SiteFilter) {
    setFilter(nextFilter);
    if (!mockSites.some((site) => site.id === selectedId && (nextFilter === "all" || site.kind === nextFilter))) {
      const firstVisible = mockSites.find((site) => nextFilter === "all" || site.kind === nextFilter);
      if (firstVisible) setSelectedId(firstVisible.id);
    }
  }

  return (
    <section className={styles.page} aria-labelledby="demo-title">
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>CENTRO DE EXPLORACIÓN</span>
          <h1 id="demo-title">Lunar landing site navigator</h1>
        </div>
        <span className={styles.connection}><span /> DATOS DE DEMOSTRACIÓN</span>
      </div>

      <div className={styles.workspace}>
        <SitesPanel
          sites={visibleSites}
          selectedId={selectedId}
          filter={filter}
          onFilterChange={handleFilterChange}
          onSelect={setSelectedId}
        />

        <section className={styles.mapPanel} aria-label="Mapa interactivo de la Luna">
          <div className={`${styles.map} ${ground ? styles.ground : ""}`}>
            <div className={styles.mapGrid} />
            <div className={styles.mapContent} style={{ transform: `scale(${zoom})` }}>
              <div className={styles.orbit} />
              <div className={styles.orbitSecondary} />
              {view === "3D" ? <MoonScene layout="demo" animate={live} /> : <MoonFlat />}

              <div className={styles.earth}>
                <span />
                <small>Tierra</small>
              </div>

              {visibleSites.map((site) => (
                <button
                  type="button"
                  key={site.id}
                  className={`${styles.marker} ${site.id === selectedId ? styles.markerSelected : ""}`}
                  style={{ left: `${site.mapPosition.x}%`, top: `${site.mapPosition.y}%` }}
                  onClick={() => setSelectedId(site.id)}
                  aria-label={`Seleccionar ${site.name}`}
                  aria-pressed={site.id === selectedId}
                >
                  <span className={styles.markerDot} />
                  <span className={styles.markerLabel}>{site.name}</span>
                </button>
              ))}
            </div>

            <div className={styles.mapTopline}>
              <span><Crosshair size={13} /> VISTA LUNAR</span>
              <span>89.9° S&nbsp; · &nbsp;0.0° E</span>
            </div>

            <div className={styles.compass} aria-label="Orientación norte">
              <span>N</span><i /><b />
            </div>

            <div className={styles.zoomControls} aria-label="Controles de zoom">
              <button type="button" onClick={() => setZoom((value) => Math.min(1.45, value + 0.1))} aria-label="Acercar">
                <Plus size={16} />
              </button>
              <button type="button" onClick={() => setZoom((value) => Math.max(0.75, value - 0.1))} aria-label="Alejar">
                <Minus size={16} />
              </button>
              <button type="button" onClick={() => setZoom(1)} aria-label="Restablecer zoom">
                <LocateFixed size={14} />
              </button>
            </div>

            <ViewControls
              view={view}
              ground={ground}
              live={live}
              onViewChange={setView}
              onGroundChange={() => setGround((value) => !value)}
              onLiveChange={() => setLive((value) => !value)}
            />
          </div>
        </section>

        <DetailsPanel site={selectedSite} tab={tab} onTabChange={setTab} />
      </div>

      <div className={styles.footerLine}>
        <span><Activity size={13} /> {live ? "SIMULACIÓN ACTIVA" : "SIMULACIÓN EN PAUSA"} · {mockSites.length} PUNTOS DE INTERÉS</span>
        <span>FUENTE: DATOS LOCALES DE DEMOSTRACIÓN</span>
      </div>
    </section>
  );
}

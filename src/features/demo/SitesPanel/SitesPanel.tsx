import { MapPin, RadioTower } from "lucide-react";
import type { LunarSite } from "../../../data/mockSites";
import styles from "./SitesPanel.module.css";

export type SiteFilter = "all" | "site" | "coordinate";

interface SitesPanelProps {
  sites: LunarSite[];
  selectedId: string;
  filter: SiteFilter;
  onFilterChange: (filter: SiteFilter) => void;
  onSelect: (id: string) => void;
}

const filters: { value: SiteFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "site", label: "Sitios" },
  { value: "coordinate", label: "Coordenadas" },
];

export default function SitesPanel({ sites, selectedId, filter, onFilterChange, onSelect }: SitesPanelProps) {
  return (
    <aside className={styles.panel} aria-label="Puntos de interés">
      <div className={styles.sectionTitle}><MapPin size={13} /> PUNTOS DE INTERÉS</div>
      <div className={styles.filters} role="group" aria-label="Filtrar puntos de interés">
        {filters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={filter === item.value ? styles.filterActive : ""}
            aria-pressed={filter === item.value}
            onClick={() => onFilterChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ul className={styles.siteList}>
        {sites.map((site) => (
          <li key={site.id}>
            <button
              type="button"
              className={`${styles.site} ${site.id === selectedId ? styles.selected : ""}`}
              onClick={() => onSelect(site.id)}
              aria-pressed={site.id === selectedId}
            >
              <span className={styles.thumbnail} />
              <span className={styles.siteCopy}>
                <strong>{site.name}</strong>
                <small>{site.coordinates}</small>
              </span>
              <span className={`${styles.status} ${styles[site.status]}`} aria-label={site.status} />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.legend}><RadioTower size={13} /> SITIOS DE ATERRIZAJE</div>
    </aside>
  );
}
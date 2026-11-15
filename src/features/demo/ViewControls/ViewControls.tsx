import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import styles from "./ViewControls.module.css";

export type MoonView = "2D" | "3D";

interface ViewControlsProps {
  view: MoonView;
  ground: boolean;
  live: boolean;
  onViewChange: (view: MoonView) => void;
  onGroundChange: () => void;
  onLiveChange: () => void;
}

export default function ViewControls({
  view,
  ground,
  live,
  onViewChange,
  onGroundChange,
  onLiveChange,
}: ViewControlsProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, [live]);

  const utcTime = now.toISOString().slice(11, 19);

  return (
    <div className={styles.controls}>
      <div className={styles.viewGroup} role="group" aria-label="Modo de visualización">
        {(["2D", "3D"] as const).map((mode) => (
          <button
            type="button"
            key={mode}
            className={view === mode ? styles.active : ""}
            aria-pressed={view === mode}
            onClick={() => onViewChange(mode)}
          >
            {mode}
          </button>
        ))}
      </div>
      <button type="button" className={`${styles.toggle} ${ground ? styles.toggleActive : ""}`} onClick={onGroundChange} aria-pressed={ground}>
        Ground
      </button>
      <button type="button" className={`${styles.live} ${live ? styles.liveActive : ""}`} onClick={onLiveChange} aria-pressed={live}>
        <Radio size={12} /> {live ? "Live" : "Pausado"}
      </button>
      <time className={styles.clock} dateTime={now.toISOString()}>{utcTime} UTC</time>
    </div>
  );
}
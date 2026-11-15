import styles from "./MoonFlat.module.css";

export default function MoonFlat() {
  return (
    <div className={styles.frame} aria-label="Vista 2D de la superficie lunar" role="img">
      <div className={styles.moon} />
    </div>
  );
}
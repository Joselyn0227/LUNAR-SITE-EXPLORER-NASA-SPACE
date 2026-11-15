import { GitFork } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.project}>Astronomía del María 1</span>
        <span className={styles.challenge}>NASA SPACE APPS CHALLENGE 2026</span>
        <a
          className={styles.github}
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GitFork size={18} aria-hidden="true" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}
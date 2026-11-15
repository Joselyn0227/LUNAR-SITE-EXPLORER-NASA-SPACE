import type { ReactNode } from "react";
import styles from "./SectionLabel.module.css";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return <span className={styles.label}>{children}</span>;
}
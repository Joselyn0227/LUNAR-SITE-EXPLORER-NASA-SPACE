import type { HTMLAttributes } from "react";
import styles from "./GlassCard.module.css";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export default function GlassCard({ glow = false, className = "", children, ...rest }: GlassCardProps) {
  return (
    <div className={[styles.card, glow ? styles.glow : "", className].join(" ")} {...rest}>
      {children}
    </div>
  );
}
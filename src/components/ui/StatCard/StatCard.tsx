import type { ReactNode } from "react";
import { GlassCard } from "../GlassCard";
import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export default function StatCard({ label, value, className = "" }: StatCardProps) {
  return (
    <GlassCard className={[styles.card, className].join(" ")}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </GlassCard>
  );
}
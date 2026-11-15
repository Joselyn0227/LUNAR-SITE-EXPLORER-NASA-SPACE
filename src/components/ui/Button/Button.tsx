import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "solid" | "outline" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  to?: string; // ruta interna
  href?: string; // enlace externo (se abre en pestaña nueva)
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  variant = "outline",
  to,
  href,
  icon,
  iconPosition = "right",
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], className].join(" ");
  const content = (
    <>
      {icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
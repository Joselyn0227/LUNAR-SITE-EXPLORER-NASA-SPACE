import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Globe, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/reto", label: "Reto" },
  { to: "/solucion", label: "Solución" },
  { to: "/acerca-de", label: "Acerca de" },
  { to: "/demo", label: "Demo", arrow: true },
];

function Logo() {
  return (
    <svg width="38" height="38" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="1.5"
        strokeDasharray="62 20" strokeLinecap="round" />
      <circle cx="18" cy="18" r="4.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={close} aria-label="Ir al inicio">
          <Logo />
          <span className={styles.brandText}>
            ASTRONOMÍA
            <br />
            DEL MARÍA 1
          </span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Principal">
          {links.map(({ to, label, end, arrow }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={close}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
            >
              {label}
              {arrow && <ArrowUpRight size={13} />}
            </NavLink>
          ))}
        </nav>

        <div className={styles.tagline}>
          <Globe size={18} />
          <span>Explora · Analiza · Encuentra</span>
        </div>

        <button
          className={styles.toggle}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
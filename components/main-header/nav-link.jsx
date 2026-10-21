"use client";
import Link from "next/link";
import styles from "./nav-lnk.module.css";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      className={
        path.startsWith(href) ? `${styles.active} ${styles.link}` : styles.link
      }
      href={href}
    >
      {children}
    </Link>
  );
}

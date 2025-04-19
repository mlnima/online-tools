import React from "react";
import styles from "../styles/Footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoLinks}>
          <span className={styles.logo}>
            <Link href="/">WebWizKit</Link>
          </span>
          <nav className={styles.navLinks}>
            <Link href="/about">About</Link>
            <Link href="/tools">Tools</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} WebWizKit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

"use client";
import styles from "../styles/Header.module.scss";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import dynamic from "next/dynamic";

const BurgerMenu = dynamic(() => import("./BurgerMenu"), { ssr: false });

export default function HeaderClient() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoNav}>
          <span className={styles.logo}>
            <Link href="/" aria-label="Go to Home Page" title="Go to Home Page">WebWizKit</Link>
          </span>
          <nav className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/sitemap">Sitemap</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <span className="burger-menu-container">
            <BurgerMenu
              navLinks={
                <>
                  <Link href="/">Home</Link>
                  <Link href="/sitemap">Sitemap</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                </>
              }
              themeSwitcher={<ThemeSwitcher />}
            />
          </span>
        </div>
        <span className="desktop-theme-switcher">
          <ThemeSwitcher />
        </span>
      </div>
      <style jsx global>{`
        @media (max-width: 600px) {
          .desktop-theme-switcher {
            display: none !important;
          }
          .burger-menu-container {
            display: flex;
          }
          .navLinks {
            display: none !important;
          }
        }
        @media (min-width: 601px) {
          .burger-menu-container {
            display: none !important;
          }
          .navLinks {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}

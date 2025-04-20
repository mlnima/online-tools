"use client";
import styles from "../styles/ComingSoon.module.scss";

export default function ComingSoon() {
  return (
    <div className={styles.comingSoonBox}>
      <span className={styles.icon}>🚧</span>
      <h2 className={styles.title}>Coming Soon</h2>
      <p className={styles.text}>This tool is under development. Check back soon!</p>
    </div>
  );
}

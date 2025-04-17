"use client";
import { useTheme } from "../theme-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import styles from "./ThemeSwitcher.module.scss";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className={styles.themeSwitcher}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Switch theme"
    >
      {theme === "dark" ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  );
}

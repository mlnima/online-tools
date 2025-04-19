"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

export default function MobileHeaderClient() {
  useEffect(() => {
    // Only render on mobile
    if (typeof window === "undefined") return;
    if (window.innerWidth > 600) return;
    const placeholder = document.getElementById("burger-menu-placeholder");
    if (!placeholder) return;
    // Dynamically import BurgerMenu client-side
    import("./BurgerMenu").then(({ default: BurgerMenu }) => {
      const navLinks = (
        <>
          <Link href="/">Home</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </>
      );
      const elem = document.createElement("div");
      placeholder.appendChild(elem);
      // Render the burger menu into the placeholder using React portal
      import("react-dom/client").then(ReactDOM => {
        if (ReactDOM.createRoot) {
          ReactDOM.createRoot(elem).render(
            <BurgerMenu navLinks={navLinks} themeSwitcher={<ThemeSwitcher />} />
          );
        } else {
          // fallback for React 17
          import("react-dom").then(LegacyReactDOM => {
            LegacyReactDOM.render(
              <BurgerMenu navLinks={navLinks} themeSwitcher={<ThemeSwitcher />} />,
              elem
            );
          });
        }
      });
    });
    // Cleanup
    return () => {
      if (placeholder) placeholder.innerHTML = "";
    };
  }, []);
  return null;
}

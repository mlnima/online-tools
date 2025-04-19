"use client";
import React, { useState } from "react";

export default function BurgerMenu({ navLinks, themeSwitcher }: { navLinks: React.ReactNode; themeSwitcher: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="burger-menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`burger-bar${open ? " open" : ""}`}></span>
        <span className={`burger-bar${open ? " open" : ""}`}></span>
        <span className={`burger-bar${open ? " open" : ""}`}></span>
      </button>
      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-nav-content">
          {navLinks}
          <div className="mobile-theme-switcher">{themeSwitcher}</div>
        </div>
      </nav>
      <style jsx global>{`
        .burger-menu-btn {
          display: none;
          background: none;
          border: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 2.3rem;
          width: 2.3rem;
          margin-left: 1rem;
          z-index: 1002;
        }
        .burger-bar {
          display: block;
          width: 26px;
          height: 3.2px;
          margin: 4px 0;
          background: var(--color-primary);
          border-radius: 2px;
          transition: all 0.32s cubic-bezier(.4,2,.6,1);
        }
        .burger-menu-btn .burger-bar.open:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .burger-menu-btn .burger-bar.open:nth-child(2) {
          opacity: 0;
        }
        .burger-menu-btn .burger-bar.open:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        @media (max-width: 600px) {
          .burger-menu-btn {
            display: flex;
          }
          .navLinks {
            display: none !important;
          }
          .mobile-nav {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 82vw;
            max-width: 330px;
            background: var(--color-bg-secondary);
            box-shadow: -4px 0 16px rgba(0,0,0,0.13);
            transform: translateX(100%);
            transition: transform 0.23s cubic-bezier(.4,2,.6,1);
            z-index: 1001;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: 0;
          }
          .mobile-nav.open {
            transform: translateX(0);
          }
          .mobile-nav-content {
            width: 100%;
            padding: 3.2rem 1.2rem 1.3rem 1.2rem;
            display: flex;
            flex-direction: column;
            gap: 2.1rem;
          }
          .mobile-nav-content a {
            color: var(--color-text);
            font-size: 1.23rem;
            font-weight: 600;
            text-decoration: none;
            padding: 0.6rem 0;
            display: block;
          }
          .mobile-nav-content a:hover {
            color: var(--color-primary);
            text-decoration: underline;
          }
          .mobile-theme-switcher {
            margin-top: 1.2rem;
            align-self: flex-start;
          }
        }
      `}</style>
    </>
  );
}

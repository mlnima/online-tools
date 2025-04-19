import type { Metadata } from 'next';
import './styles/global.scss';
import { ThemeProvider } from './theme-provider';

import styles from "./styles/Home.module.scss";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Link from "next/link";
import { metadata as seoMetadata } from "./seo/metadata";
import GoogleAdPlaceholder from "./ads/GoogleAdPlaceholder";

export const metadata: Metadata = { ...seoMetadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <header className={styles.header}>
            <span className={styles.logo} style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>
              <Link href="/" aria-label="Go to Home Page" title="Go to Home Page" style={{ color: 'inherit', textDecoration: 'none' }}>WebWizKit</Link>
            </span>
            <ThemeSwitcher />
          </header>
          {/* Placeholder for Google Ads or other advertising - replace as needed */}
          <GoogleAdPlaceholder />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './styles/global.scss';
import { ThemeProvider } from './theme-provider';

import styles from "./styles/Home.module.scss";
import ThemeSwitcher from "./components/ThemeSwitcher";

export const metadata: Metadata = {
  title: 'Online Tools – Free Advanced Web Tools',
  description: 'A modern suite of free online tools: converters, generators, beautifiers, encoders, and more. Fast, secure, and SEO-friendly.',
  keywords: [
    'online tools',
    'base64',
    'converter',
    'beautifier',
    'generator',
    'hash',
    'color',
    'json',
    'csv',
    'image',
    'html',
    'css',
    'javascript',
    'seo',
    'free',
    'advanced',
    'web',
    'tool',
    'editor',
    'monaco',
    'dark mode',
    'night mode',
    'nextjs'
  ],
  openGraph: {
    title: 'Online Tools – Free Advanced Web Tools',
    description: 'A modern suite of free online tools: converters, generators, beautifiers, encoders, and more.',
    url: 'https://your-domain.com',
    siteName: 'Online Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Online Tools',
      },
    ],
  },
  alternates: {
    canonical: 'https://your-domain.com',
    languages: {
      en: 'https://your-domain.com/en',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <header className={styles.header}>
            <h1>Online Tools</h1>
            <ThemeSwitcher />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

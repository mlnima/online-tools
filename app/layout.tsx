import type { Metadata } from 'next';
import './styles/global.scss';
import { ThemeProvider } from './theme-provider';

import styles from "./styles/Home.module.scss";
import headerStyles from "./styles/Header.module.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { metadata as seoMetadata } from "./seo/metadata";
import GoogleAdPlaceholder from "./ads/GoogleAdPlaceholder";

export const metadata: Metadata = { ...seoMetadata };


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics: set NEXT_PUBLIC_GA_ID in .env.local */}
        <GoogleAnalytics />
      </head>
      <body>
        {/* Client-side burger menu for mobile */}
        {/* MobileHeaderClient is a client component and will only render on the client */}
        <ThemeProvider>
        <div className="page-root">
          <Header />
          {/* Placeholder for Google Ads or other advertising - replace as needed */}
        <GoogleAdPlaceholder />
          <main className="page-main">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
      </body>
    </html>
  );
}

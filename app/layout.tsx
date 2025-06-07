import type {Metadata} from 'next';
import './styles/global.scss';
import {ThemeProvider} from './theme-provider';
import Footer from "./components/Footer";
import Header from "./components/Header";
import GoogleAnalytics from "./components/GoogleAnalytics";
import {metadata as seoMetadata} from "./seo/metadata";
import GoogleAdPlaceholder from "./ads/GoogleAdPlaceholder";

export const metadata: Metadata = {...seoMetadata};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider>
            <div className="page-root">
                <Header/>
                <GoogleAdPlaceholder/>
                <main className="page-main">
                    {children}
                </main>
                <Footer/>
            </div>
            <GoogleAnalytics/>
        </ThemeProvider>
        </body>
        </html>
    );
}

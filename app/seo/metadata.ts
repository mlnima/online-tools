import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Online Tools - Free Web Utilities",
    template: "%s | Online Tools"
  },
  description: "A collection of free online tools for developers, designers, and everyone. Convert, generate, and beautify your data easily!",
  metadataBase: new URL("https://online-tools.mlnima.com"),
  openGraph: {
    title: "Online Tools - Free Web Utilities",
    description: "A collection of free online tools for developers, designers, and everyone. Convert, generate, and beautify your data easily!",
    url: "https://online-tools.mlnima.com",
    siteName: "Online Tools",
    images: [
      {
        url: "/seo/default-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Online Tools - Free Web Utilities"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Tools - Free Web Utilities",
    description: "A collection of free online tools for developers, designers, and everyone. Convert, generate, and beautify your data easily!",
    images: ["/seo/default-opengraph.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico"
  }
};
